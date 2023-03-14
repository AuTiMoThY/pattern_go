$(function() {
	pgUI.dropdown.itemClick($(".menu-item"), function(){
		console.log('選取項目之後的動作寫在這兒。');
		console.log('看是要傳值還是怎樣的');
	});


	pgUI.toggleLayout($(".layout-toggle-picker .btn_picker"), $(".main_content"));

	$(".more-item").each(function(index, el) {
		if ($(el).children(".more-sublist").length) {
			$(el).addClass('has-sub');
		}
	});



});