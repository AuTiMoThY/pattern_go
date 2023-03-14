$(function() {
	// 側邊攔 sticky 效果
	const $details = $(".plan_upgrade-main");
	const $aside = $(".plan_upgrade-aside");
	const $aside_content = $(".plan_upgrade-aside .pgpannel");

	const controller = new ScrollMagic.Controller();
	const scene = new ScrollMagic.Scene({
		triggerElement: $aside,
		triggerHook: 0,
		duration: getDuration,
		offset: -100
	})
	.addTo(controller);
	// scene.addIndicators();


	scene.setPin($aside, {pushFollowers: false});

	function getDuration(){
		return $details.outerHeight() - $aside_content.outerHeight();
	}

	$(".js-openPopupPlan").click(function(event) {
		pgMbrPopup.open(this);
	});

	$(".pgpopup-close").click(function(event) {
		pgMbrPopup.close(this);
	});


	// 選擇支付方式 項目點擊
	$(".payment_method_item .inner").click(function(event) {
		var $item = $(this).parents(".payment_method_item");

		var $input = $item.find('input');
		var PaymentMethodVal = $("[name='PaymentMethod']:checked").val();

		// 點擊未勾選的，取消其他，勾選當項，隱藏填寫卡片信息
		if (!$item.hasClass('js-checked')) {
			console.log($input.prop('checked'))
			$(".payment_method_item.js-checked").removeClass('js-checked');
			$(".payment_method_item").find('input:checked').prop('checked', false);
			$item.addClass('js-checked');
			$input.prop('checked', true);
			$(".other_ccard").hide();
		}
		// 取消勾選，顯示填寫卡片信息
		else {
			$(".payment_method_item.js-checked").removeClass('js-checked');
			$(".payment_method_item").find('input:checked').prop('checked', false);
			$(".other_ccard").show();
		}

	});

	// 點擊 "去結帳" 按鈕
	$(".plan_upgrade_frm-submit").click(function(event) {
		var PaymentMethodVal = $("[name='PaymentMethod']:checked").val();

		console.log(PaymentMethodVal);

		// 選擇微信支付
		if (PaymentMethodVal == "PaymentMethod-wechat") {
			var popupId = "popupThirdParty-wechat"
			// 開啟QRCode popup
			pgMbrPopup.openid(popupId);

			// 示意: 掃描完成後，跳轉至付款成功
			$("#" + popupId).find('.third_party-qrcode').click(function(event) {
				// 關閉當前popup
				pgMbrPopup.closeid(popupId);
				// 開啟付款成功popup
				pgMbrPopup.openid("popupPaymentSuccess");
			});

		}
		// 選擇支付寶
		else if (PaymentMethodVal == "PaymentMethod-alipay") {
			var popupId = "popupThirdParty-alipay"
			// 開啟QRCode popup
			pgMbrPopup.openid(popupId);

			// 示意: 掃描完成後，跳轉至付款成功
			$("#" + popupId).find('.third_party-qrcode').click(function(event) {
				// 關閉當前popup
				pgMbrPopup.closeid(popupId);
				// 開啟付款成功popup
				pgMbrPopup.openid("popupPaymentSuccess");
			});
		}
		else {
			location.href="mbr_checkout.html";
		}
	});

	// 付款成功popup，按下確認按鈕
	$("#popupPaymentSuccess").find('.pgbtn-submit').click(function(event) {
		pgMbrPopup.close(this);

		// 導頁至 選擇方案 頁面
		location.href="mbr_plan.html";
	});



});