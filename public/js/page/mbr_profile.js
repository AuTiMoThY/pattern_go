$(function() {


	// 下拉選單 - 就職/學 狀態
	$("#PIF-Status").multipleSelect({
		selectAll: false,
		placeholder : "請選擇",
		// multiple: false,
		single: true,
	});

	// 下拉選單 - 身分
	$("#PIF-Identity").multipleSelect({
		selectAll: false,
		placeholder : "請選擇",
		// multiple: false,
		single: true,
	});

	// 下拉選單 - 學歷
	$("#PIF-Education").multipleSelect({
		selectAll: false,
		placeholder : "請選擇",
		// multiple: false,
		single: true,
	});


	// 下拉選單 - 擅長項目
	$("#PIF-Expert").multipleSelect({
		// isOpen: true,
		// keepOpen: true,
		width: "100%",
		// maxHeight: 130,
		// filter: true,
		selectAll: false,
		noMatchesFound: "找不到結果",
		placeholder : "請選擇 (可複選)",
		multiple: true,
		single: false,
		multipleWidth: "100%",
		ellipsis: true
	});

	// 頁籤 (帳號資訊 & 個人資訊 切換)
	pgUI.tabs(1);

	// 就職/學 狀態 選擇項目後切換欄位
	$("#PIF-Status").change(function(event) {
		var status = $(this).find(':selected').data('def');
		console.log(status);

		$(".personalInfo_frm-status-work").removeClass('js-show');
		$(".personalInfo_frm-status-school").removeClass('js-show');
		$(".personalInfo_frm-" + status).addClass('js-show');


		$(".tabs_container").height($(".tab_content.js-show").innerHeight());
	});

	// 更改頭像 按鈕
	$(".profile_block-change").click(function(event) {
		// var popupId = $(this).data('popup');
		pgMbrPopup.open(this);


	});

	// 更改頭像 燈箱裡 確認按鈕
	$(".pgpopup_change_photo_frm .pgbtn-submit").click(function(event) {
		// 關閉燈箱
		pgMbrPopup.close(this);
	});


	// 變更電子信箱 按鈕
	$(".change_email").click(function(event) {
		pgMbrPopup.open(this);
	});

	// 變更電子信箱 燈箱裡 發送認證信按鈕
	$(".pgpopup_change_email-submit").click(function(event) {
		// 關閉燈箱
		pgMbrPopup.close(this);
	});

	// 驗證 按鈕
	$(".accountInfo_frm-check").click(function(event) {
		pgMbrPopup.open(this);

		pgUI.countdown.init(60 * 5, "countdownTime");
	});

	// 输入验证码 燈箱裡 確認按鈕
	$(".pgpopup_check_code-submit").click(function(event) {
		// 關閉燈箱
		pgMbrPopup.close(this);
	});
});