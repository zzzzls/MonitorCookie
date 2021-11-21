// 初始化数据
chrome.storage.local.get(['webhook', 'filter_domain', 'monitor'], function (result) {
    let webhook = result.webhook || 'http://127.0.0.1:8080';
    let filter_domain = result.filter_domain || '*';
    let monitor = result.monitor || false;
    $('#webhook').val(webhook);
    $('#filter_domain').val(filter_domain);
    $('#monitor').prop('checked', monitor);
});



$('#submit').click(async () => {
    chrome.storage.local.set({ 'webhook': $('#webhook').val() });
    chrome.storage.local.set({ 'filter_domain': $('#filter_domain').val() });
})

$("#monitor").change(() => {
    let checked = $("#monitor").prop('checked');
    chrome.storage.local.set({ 'monitor': checked });

    // 修改图标颜色
    let color = checked ? 'red' : 'blue';
    chrome.action.setIcon(
        details = { path: `icon/${color}48.png` }
    )
})
