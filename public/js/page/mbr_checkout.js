$(function() {
	// 按下 确认付款 按鈕
	$(".pgbtn-confirm_payment").click(function(event) {
		pgMbrPopup.openid("popupPaymentSuccess")
	});

	// 付款成功popup，按下確認按鈕
	$("#popupPaymentSuccess").find('.pgbtn-submit').click(function(event) {
		pgMbrPopup.close(this);
		// 導頁至 選擇方案 頁面
		location.href="mbr_plan.html";
	});
});