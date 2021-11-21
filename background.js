let config = {};

// 发送网络请求
function send_local(url, data) {
    let resp = fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
}

chrome.cookies.onChanged.addListener(async cookie => {
    if (config.monitor) {
        if (cookie['cause'] === "explicit" && cookie['removed'] === false) {
            if (config.filter_domain === "*" || cookie['cookie']['domain'].indexOf(config.filter_domain) != -1) {
                let cookie_data = {
                    "domain": cookie['cookie']['domain'],
                    "cookie": `${cookie['cookie']['name']}=${cookie['cookie']['value']}`
                }
                send_local(config.webhook, cookie_data);
                console.log(cookie_data);
            }
        }
    }
});

// 初始化 config
chrome.storage.local.get(['webhook', 'filter_domain', 'monitor'], function (result) {
    config.webhook = result.webhook || 'http://127.0.0.1:8080';
    config.filter_domain = result.filter_domain || '*';
    config.monitor = result.monitor || false;
});

// 更新 config
chrome.storage.onChanged.addListener(async (changes) => {
    for (let k in changes) {
        config[k] = changes[k].newValue;
    }
})

