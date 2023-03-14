$(function() {

	$("body").on('click', '.pgpopup-close', function(event) {
		event.preventDefault();
		pgMbrPopup.close(this);
	});

	$("body").on('click', '.js-open_popup', function(event) {
		event.preventDefault();
		pgMbrPopup.open(this);
	});

	$("body").on('click', '.js-cancel', function(event) {
		event.preventDefault();
		var $this = $(this);
		pgMbrPopup.close(this, function(){
			var $popup = $this.parents(".pgpopup");
			var parentId = $popup.attr('id');

			console.log(parentId);

			$popup.find('input').val("");
		});
	});

	$(".pgpopup_credit_card_setting .pgbtn-submit").click(function(event) {
		pgMbrPopup.close(this);
		$("#popupCreditCardSuccess").addClass('js-show');
	});

	$(".pgpopup_credit_card_success .pgbtn-submit").click(function(event) {
		pgMbrPopup.close(this);
	});


	$(".pgpopup_deposit .pgbtn-submit").click(function(event) {
		location.href="mbr_wallet_stored.html"
	});

});