$(function() {

	// 下拉選單 - 身分别
	$("#AAF-Identity").multipleSelect({
		selectAll: false,
		placeholder : "請選擇",
		// multiple: false,
		single: true,
	});

	// 下拉選單 - 所属部门
	$("#AAF-Department").multipleSelect({
		selectAll: false,
		placeholder : "請選擇",
		// multiple: false,
		single: true,
	});

	// 下拉選單 - 身分别
	$("#AEF-Identity").multipleSelect({
		selectAll: false,
		placeholder : "請選擇",
		// multiple: false,
		single: true,
	});

	// 下拉選單 - 所属部门
	$("#AEF-Department").multipleSelect({
		selectAll: false,
		placeholder : "請選擇",
		// multiple: false,
		single: true,
	});

	// 下拉選單 - 设计总监
	$("#DEF-Director").multipleSelect({
		selectAll: false,
		placeholder : "請選擇",
		// multiple: false,
		single: true,
	});


	// 頁籤 (帳號管理 & 部門設定 切換)
	pgUI.tabs(1);



	// 帳號管理 - 點擊"新增成员"按鈕
	$(".account_mgmt_block .pgbtn-add").click(function(event) {
		pgMbrPopup.openid("popupAccountEditor");
	});

	// 帳號管理 - 點擊"刪除帳號"按鈕
	$(".account_mgmt_block .pgbtn-del").click(function(event) {
		pgMbrPopup.openid("popupDelectSuccess");
	});

	// popup 成員新增/編輯 - 點擊"確認"按鈕
	$(".pgpopup_delect_success .pgbtn-confirm").click(function(event) {
		pgMbrPopup.close(this);
	});


	// 帳號管理 - 成員列表，點擊"编辑"按鈕
	$(".pgbtn-editor").click(function(event) {
		var $item = $(this).parents(".account_mgmt_item");
		// 取該成員ID
		var accountID = $item.attr('id');

		pgMbrPopup.openid("popupAccountEditor");
	});

	// popup 成員新增/編輯 點擊"取消"按鈕
	$(".pgpopup_account_editor .pgbtn-cancel").click(function(event) {
		// 關閉popup
		pgMbrPopup.close(this);
	});
	// popup 成員新增/編輯 點擊"储存"按鈕
	$(".pgpopup_account_editor .pgbtn-submit").click(function(event) {
		// 關閉popup
		pgMbrPopup.close(this);
	});
	// popup 成員新增/編輯 點擊"保存并继续新增"按鈕
	$(".pgpopup_account_editor .pgbtn-continue").click(function(event) {
		// 關閉popup
		pgMbrPopup.close(this);

		pgMbrPopup.openid("popupAccountEditor");
	});


	// 部門管理 列表  點擊"編輯部門"按鈕
	$(".department_mgmt_item .pgbtn-dep-editor").click(function(event) {
		pgMbrPopup.openid("popupDepEditor");
	});

	// popup 编辑部门 點擊"取消"按鈕
	$(".pgpopup_dep_editor .pgbtn-cancel").click(function(event) {
		// 關閉popup
		pgMbrPopup.close(this);
	});

	// 勾選成員 動作
	function member_select(){
		var $member_list = $(".pgpopup_dep_editor .dep_member_list");
		var listHeight = $member_list.height();
		var listOffsetTop = $member_list.position().top;
		var listOffsetLeft = $member_list.position().left;

		console.log(listOffsetTop)
		// 勾選成員框 CSS定位
		$(".dep_member_select").css({
			top: listOffsetTop + listHeight + 10,
			left: listOffsetLeft
		});

		// 開啟 勾選成員框
		$(".dep_member_item.add_member").click(function(event) {
			var $popup = $(this).parents(".pgpopup");
			var $member_select = $popup.find('.dep_member_select');

			$member_select.addClass('js-show');
		});

		// 關閉 勾選成員框
		$(".dep_member_select-hd .ctrl").click(function(event) {
			$('.dep_member_select').removeClass('js-show');
		});
	}
	member_select();



	// 按下 "建立新部門"
	$(".add_department .js-open_popup").click(function(event) {
		pgMbrPopup.openid("popupAddEditor");
	});

	// 人員編制 控制
	function staffing_controller(){
		// 點擊 查看: 展開/收合
		$(".accordion-ctrl").click(function(event) {
			var $item = $(this).parents(".staffing_item");

			if (!$item.hasClass('js-open')) {
				$item.addClass('js-open');
			}
			else {
				$item.removeClass('js-open');
				if ($item.hasClass('js-edit_mode')) {
					$item.removeClass('js-edit_mode');
					$item.find('.toggle_edit_mode').text("编辑成员");
				}
			}

			$(".tabs_container").height($(".tab_content.js-show").innerHeight());
		});

		$(".toggle_edit_mode").click(function(event) {
			var $item = $(this).parents(".staffing_item");
			var _this = $(this);

			if (!$item.hasClass('js-edit_mode')) {
				$item.addClass('js-edit_mode');
				_this.text("结束编辑");
			}
			else {
				$item.removeClass('js-edit_mode');
				_this.text("编辑成员");
			}

			if (!$item.hasClass('js-open')) {
				$item.addClass('js-open');
			}

			$(".tabs_container").height($(".tab_content.js-show").innerHeight());
		});
	}
	staffing_controller();

});