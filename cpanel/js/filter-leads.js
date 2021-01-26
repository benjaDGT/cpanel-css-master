var count = 0;

$(document).on('click', '.ms-dw-ft', function (e) {
	e.stopPropagation();
});

$(document).on('click', '.ms-sp-dp', function () {
	$(this).parent().addClass("open");
});

$(document).on('click', '.ms-ft-bl-item-btn', function () {
	$(this).remove();
});

$(document).on('click', '.ms-any-all-list', function () {
	$(this).parent().addClass("open");
	var offset = $(this).offset();
	var top = offset.top;
	var left = offset.left;
	$(this).parent().find(".dropdown-menu").css({"top":top,"left":left});
});

$(document).on('click', '.ms-scoll-list li a', function () {
	var itemText = $(this).attr("data-text");
	$(this).parents(".ms-any-all").find(".ms-any-all-list").text(itemText);
	$(this).parents(".ms-any-all").removeClass("open");
});

$(document).on('click', '.ms-blur', function () {
	var inputText = $(this).parents(".ms-wrap-contains").find("input").val();
	if(inputText !== ""){
		var parent = $(this).parents(".ms-wrap-contains").find(".ms-blur-list").append('<span class="ms-ft-bl-item-btn">'+inputText+'</span>');
		$(this).parents(".ms-wrap-contains").find("input").val("");
	}
});

$(document).on('click', '.ms-wp-ft-ct-hd', function () {
	if($(this).parent().hasClass("active")){
		$(this).parent().removeClass("active");
	}else{
		$(this).parent().addClass("active");
	}
});

$(document).on('click', '.clearFilter', function () {
	$(".ms-wp-ft-ct").remove();
	$(".ms-wrap-info-filter").css({"display":"block"});
	$(".ms-wrap-save-fd").css({"display":"none"});
});

$(document).on('click', '.ms-sp-dp-close li a', function () {
	console.log("text="+$(this).text());
	$(this).parents(".ms-sp-wp").find(".ms-sp-dp").text($(this).text());
	$(this).parents(".ms-sp-wp").removeClass("open");
});

$(document).on('click', '.ft-select-sr', function () {
	var thisElement = $(this);
	var parent = thisElement.parent();
	var parentPrint = parent.find(".ms-dw-ft");
	var search = thisElement.attr("data-search");
	parent.toggleClass("temp-open open");
	loadSelectFilter("tagFilter", parentPrint, parent, search);
	var offset = thisElement.offset();
	var top = offset.top;
	var left = offset.left;
	$(this).parent().find(".ms-dw-ft").css({"top":top,"left":left});
});

$(document).click(function(event) {
	if (!$(event.target).closest(".ft-select-sr").length) {
		$("body").find(".temp-open").removeClass("temp-open open");
	}
});

$(document).on('click', '.ms-wrap-lead-filters', function (event) {
	if (!$(event.target).closest(".ft-select-sr").length) {
		$("body").find(".temp-open").removeClass("temp-open open");
	}
});

$(document).on('click','.ms-lead-filters .ui-widget .ui-menu-item', function(){
	var filterType = $(this).attr("data-filter");
	$("#searchFilterList").val('');
	$(".ms-wrap-info-filter").css({'display':'none'});
	$("#ms-filter-ld .ui-autocomplete").css({'display':'none'});
	$(".ms-wrap-save-fd").css({'display':'block'});
	count = count + 1; 
	loadFilterType(filterType,count);
});

$(document).on('click','.ms-close-panel', function(){
	var countClose = 0;
	countClose = $(".ms-close-panel").length;
	$("#"+$(this).attr("data-id")).remove();
	if(countClose <= 1){
		$(".ms-wrap-info-filter").css({'display':'block'});
		$(".ms-wrap-save-fd").css({'display':'none'});
		count = 0;
	}
});

$(document).on('click','.ms-ft-tag-item-btn', function(){
	var parentChk = $(this).parents(".ms-wrap-ck");
	var parent = parentChk.find(".ms-wrap-ft-select-sr");
	dataTagList.push($(this).attr("data-value"));
	var dataTagListCount = dataTagList.length;
	if(dataTagListCount > 0){
		$(this).parents(".ms-wrap-ck").find(".ms-wrap-ft-dropdown").css({'display':'block'});
	}
	$(this).remove();
	var countTagBtn = ($(".ms-ft-tag-item-btn").length) * 1;

	console.log("sdd="+countTagBtn);

	if(countTagBtn == 0){
		parent.removeClass("active-list");
		parent.find(".ft-select-sr").attr("data-original-title","");
		parentChk.find('input[type="radio"]').prop('checked', false);
	}
});

function loadFilterType(filter,numitem){
	switch (filter) {
		//TAGS
		case 'ft-ld-tag':
			$(".ms-body-lead-filters").prepend(
				'<div class="ms-wp-ft-ct active" id="ft-item-'+numitem+'">'+
					'<div class="ms-wp-ft-ct-hd">'+
						'<div class="ms-tb-panel">'+
							'<span class="ms-title ico-tag">Tag</span>'+
						'</div>'+
						'<div class="ms-wrap-close"><a class="ms-close-panel" data-toggle="tooltip" data-placement="left" title="Remove" data-id="ft-item-'+numitem+'"></a></div>'+
					'</div>'+
					'<div class="ms-wp-ft-ct-bd">'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-tag-'+numitem+'" id="ft-ld-tag-a-'+numitem+'"/>'+
								'<label for="ft-ld-tag-a-'+numitem+'">are not empty</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-tag-'+numitem+'" id="ft-ld-tag-b-'+numitem+'"/>'+
								'<label for="ft-ld-tag-b-'+numitem+'">include <span>any</span></label>'+
								'<div class="ms-any-all">'+
									'<a class="ms-any-all-list">any</a>'+
									'<div class="dropdown-menu">'+
										'<ul class="ms-scoll-list">'+
											'<li><a data-text="any">Any</a></li>'+
											'<li><a data-text="all">All</a></li>'+
										'</ul>'+
									'</div>'+
								'</div>'+
								'<div class="ms-wrap-ft-select-sr">'+
									'<div class="ms-wrap-ft-dropdown">'+
										'<div class="ft-select-sr" role="button" data-toggle="tooltip" data-placement="top" data-original-title="" title="" data-search="ms-ft-inputfilter-a-'+numitem+'"></div>'+
										'<div class="dropdown-menu ms-dw-ft"></div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-tag-'+numitem+'" id="ft-ld-tag-c-'+numitem+'"/>'+
								'<label for="ft-ld-tag-c-'+numitem+'">exclude any</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-tag-'+numitem+'" id="ft-ld-tag-d-'+numitem+'"/>'+
								'<label for="ft-ld-tag-d-'+numitem+'">are empty</label>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			break;
		//NAME
		case 'ft-ld-name':
			$(".ms-body-lead-filters").prepend(
				'<div class="ms-wp-ft-ct active" id="ft-item-'+numitem+'">'+
					'<div class="ms-wp-ft-ct-hd">'+
						'<div class="ms-tb-panel">'+
							'<span class="ms-title ico-name">Name</span>'+
						'</div>'+
						'<div class="ms-wrap-close"><a class="ms-close-panel" data-toggle="tooltip" data-placement="left" title="Remove" data-id="ft-item-'+numitem+'"></a></div>'+
					'</div>'+
					'<div class="ms-wp-ft-ct-bd">'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-name-'+numitem+'" id="ft-ld-name-a-'+numitem+'"/>'+
								'<label for="ft-ld-name-a-'+numitem+'">is not empty</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-name-'+numitem+'" id="ft-ld-name-b-'+numitem+'"/>'+
								'<label for="ft-ld-name-b-'+numitem+'">contains</label>'+
								'<div class="ms-wrap-contains">'+
									'<input type="text" class="ms-input">'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-name-'+numitem+'" id="ft-ld-name-c-'+numitem+'"/>'+
								'<label for="ft-ld-name-c-'+numitem+'">is empty</label>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			break;
		//EMAIL
		case 'ft-ld-email':
			$(".ms-body-lead-filters").prepend(
				'<div class="ms-wp-ft-ct active" id="ft-item-'+numitem+'">'+
					'<div class="ms-wp-ft-ct-hd">'+
						'<div class="ms-tb-panel">'+
							'<span class="ms-title ico-email">Email</span>'+
						'</div>'+
						'<div class="ms-wrap-close"><a class="ms-close-panel" data-toggle="tooltip" data-placement="left" title="Remove" data-id="ft-item-'+numitem+'"></a></div>'+
					'</div>'+
					'<div class="ms-wp-ft-ct-bd">'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-email-'+numitem+'" id="ft-ld-email-a-'+numitem+'"/>'+
								'<label for="ft-ld-email-a-'+numitem+'">is good</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-email-'+numitem+'" id="ft-ld-email-b-'+numitem+'"/>'+
								'<label for="ft-ld-email-b-'+numitem+'">contains</label>'+
									'<div class="ms-wrap-contains">'+
										'<input type="text" class="ms-input">'+
									'</div>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-email-'+numitem+'" id="ft-ld-email-c-'+numitem+'"/>'+
								'<label for="ft-ld-email-c-'+numitem+'">does not contain</label>'+
									'<div class="ms-wrap-contains">'+
										'<input type="text" class="ms-input">'+
									'</div>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-email-'+numitem+'" id="ft-ld-email-d-'+numitem+'"/>'+
								'<label for="ft-ld-email-d-'+numitem+'">is not empty</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-email-'+numitem+'" id="ft-ld-email-e-'+numitem+'"/>'+
								'<label for="ft-ld-email-e-'+numitem+'">is empty</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-email-'+numitem+'" id="ft-ld-email-f-'+numitem+'"/>'+
								'<label for="ft-ld-email-f-'+numitem+'">is bad</label>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			break;
		//PHONE
		case 'ft-ld-phone':
			$(".ms-body-lead-filters").prepend(
				'<div class="ms-wp-ft-ct active" id="ft-item-'+numitem+'">'+
					'<div class="ms-wp-ft-ct-hd">'+
						'<div class="ms-tb-panel">'+
							'<span class="ms-title ico-phone">Phone</span>'+
						'</div>'+
						'<div class="ms-wrap-close"><a class="ms-close-panel" data-toggle="tooltip" data-placement="left" title="Remove" data-id="ft-item-'+numitem+'"></a></div>'+
					'</div>'+
					'<div class="ms-wp-ft-ct-bd">'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-phone-'+numitem+'" id="ft-ld-phone-a-'+numitem+'"/>'+
								'<label for="ft-ld-phone-a-'+numitem+'">is good</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-phone-'+numitem+'" id="ft-ld-phone-b-'+numitem+'"/>'+
								'<label for="ft-ld-phone-b-'+numitem+'">starts with</label>'+
									'<div class="ms-wrap-contains">'+
										'<input type="text" class="ms-input">'+
									'</div>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-phone-'+numitem+'" id="ft-ld-phone-c-'+numitem+'"/>'+
								'<label for="ft-ld-phone-c-'+numitem+'">is not empty</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-phone-'+numitem+'" id="ft-ld-phone-d-'+numitem+'"/>'+
								'<label for="ft-ld-phone-d-'+numitem+'">is empty</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-phone-'+numitem+'" id="ft-ld-phone-e-'+numitem+'"/>'+
								'<label for="ft-ld-phone-e-'+numitem+'">is bad</label>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			break;
		//COUNTRY
		case 'ft-ld-country':
			$(".ms-body-lead-filters").prepend(
				'<div class="ms-wp-ft-ct active" id="ft-item-'+numitem+'">'+
					'<div class="ms-wp-ft-ct-hd">'+
						'<div class="ms-tb-panel">'+
							'<span class="ms-title ico-country">Country</span>'+
						'</div>'+
						'<div class="ms-wrap-close"><a class="ms-close-panel" data-toggle="tooltip" data-placement="left" title="Remove" data-id="ft-item-'+numitem+'"></a></div>'+
					'</div>'+
					'<div class="ms-wp-ft-ct-bd">'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-country-'+numitem+'" id="ft-ld-country-a-'+numitem+'"/>'+
								'<label for="ft-ld-country-a-'+numitem+'">is not empty</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-country-'+numitem+'" id="ft-ld-country-b-'+numitem+'"/>'+
								'<label for="ft-ld-country-b-'+numitem+'">contains</label>'+
								'<div class="ms-wrap-contains">'+
									'<input type="text" class="ms-input">'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-country-'+numitem+'" id="ft-ld-country-c-'+numitem+'"/>'+
								'<label for="ft-ld-country-c-'+numitem+'">is empty</label>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			break;
		//CREATED DATE
		case 'ft-ld-created-date':
			$(".ms-body-lead-filters").prepend(
				'<div class="ms-wp-ft-ct active" id="ft-item-'+numitem+'">'+
					'<div class="ms-wp-ft-ct-hd">'+
						'<div class="ms-tb-panel">'+
							'<span class="ms-title ico-create-date">Created Date</span>'+
						'</div>'+
						'<div class="ms-wrap-close"><a class="ms-close-panel" data-toggle="tooltip" data-placement="left" title="Remove" data-id="ft-item-'+numitem+'"></a></div>'+
					'</div>'+
					'<div class="ms-wp-ft-ct-bd">'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-cdate-'+numitem+'" id="ft-ld-cdate-a-'+numitem+'"/>'+
								'<label for="ft-ld-cdate-a-'+numitem+'">was less than</label>'+
								'<div class="ms-wrap-contains ms-flex">'+
									'<input type="text" class="ms-input" value="1">'+
									'<div class="ms-dropdown ms-sp-wp">'+
										'<button class="ms-button btn ms-sp-dp">minutes ago</button>'+
										'<ul class="ms-dropdown-list dropdown-menu ms-sp-dp-close">'+
											'<li><a>minutes ago</a></li>'+
											'<li><a>hours ago</a></li>'+
											'<li><a>days ago</a></li>'+
											'<li><a>weeks ago</a></li>'+
											'<li><a>months ago</a></li>'+
											'<li><a>years ago</a></li>'+
										'</ul>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-cdate-'+numitem+'" id="ft-ld-cdate-b-'+numitem+'"/>'+
								'<label for="ft-ld-cdate-b-'+numitem+'">was more than</label>'+
								'<div class="ms-wrap-contains ms-flex">'+
									'<input type="text" class="ms-input" value="1">'+
									'<div class="ms-dropdown ms-sp-wp">'+
										'<button class="ms-button btn ms-sp-dp">minutes ago</button>'+
										'<ul class="ms-dropdown-list dropdown-menu ms-sp-dp-close">'+
											'<li><a>minutes ago</a></li>'+
											'<li><a>hours ago</a></li>'+
											'<li><a>days ago</a></li>'+
											'<li><a>weeks ago</a></li>'+
											'<li><a>months ago</a></li>'+
											'<li><a>years ago</a></li>'+
										'</ul>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			break;
		//UPDATE DATE
		case 'ft-ld-updated-date':
			$(".ms-body-lead-filters").prepend(
				'<div class="ms-wp-ft-ct active" id="ft-item-'+numitem+'">'+
					'<div class="ms-wp-ft-ct-hd">'+
						'<div class="ms-tb-panel">'+
							'<span class="ms-title ico-updated-date">Updated Date</span>'+
						'</div>'+
						'<div class="ms-wrap-close"><a class="ms-close-panel" data-toggle="tooltip" data-placement="left" title="Remove" data-id="ft-item-'+numitem+'"></a></div>'+
					'</div>'+
					'<div class="ms-wp-ft-ct-bd">'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-udate-'+numitem+'" id="ft-ld-udate-a-'+numitem+'"/>'+
								'<label for="ft-ld-udate-a-'+numitem+'">was less than</label>'+
								'<div class="ms-wrap-contains ms-flex">'+
									'<input type="text" class="ms-input" value="1">'+
									'<div class="ms-dropdown ms-sp-wp">'+
										'<button class="ms-button btn ms-sp-dp">minutes ago</button>'+
										'<ul class="ms-dropdown-list dropdown-menu ms-sp-dp-close">'+
											'<li><a>minutes ago</a></li>'+
											'<li><a>hours ago</a></li>'+
											'<li><a>days ago</a></li>'+
											'<li><a>weeks ago</a></li>'+
											'<li><a>months ago</a></li>'+
											'<li><a>years ago</a></li>'+
										'</ul>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-udate-'+numitem+'" id="ft-ld-udate-b-'+numitem+'"/>'+
								'<label for="ft-ld-udate-b-'+numitem+'">was more than</label>'+
								'<div class="ms-wrap-contains ms-flex">'+
									'<input type="text" class="ms-input" value="1">'+
									'<div class="ms-dropdown ms-sp-wp">'+
										'<button class="ms-button btn ms-sp-dp">minutes ago</button>'+
										'<ul class="ms-dropdown-list dropdown-menu ms-sp-dp-close">'+
											'<li><a>minutes ago</a></li>'+
											'<li><a>hours ago</a></li>'+
											'<li><a>days ago</a></li>'+
											'<li><a>weeks ago</a></li>'+
											'<li><a>months ago</a></li>'+
											'<li><a>years ago</a></li>'+
										'</ul>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			break;
		//SOURCE
		case 'ft-ld-source':
			$(".ms-body-lead-filters").prepend(
				'<div class="ms-wp-ft-ct active" id="ft-item-'+numitem+'">'+
					'<div class="ms-wp-ft-ct-hd">'+
						'<div class="ms-tb-panel">'+
							'<span class="ms-title ico-source">Source</span>'+
						'</div>'+
						'<div class="ms-wrap-close"><a class="ms-close-panel" data-toggle="tooltip" data-placement="left" title="Remove" data-id="ft-item-'+numitem+'"></a></div>'+
					'</div>'+
					'<div class="ms-wp-ft-ct-bd">'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-source-'+numitem+'" id="ft-ld-source-a-'+numitem+'"/>'+
								'<label for="ft-ld-source-a-'+numitem+'">are not empty</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-source-'+numitem+'" id="ft-ld-source-b-'+numitem+'"/>'+
								'<label for="ft-ld-source-b-'+numitem+'">include any</label>'+
								'<div class="ms-wrap-ft-select-sr">'+
									'<div class="ms-wrap-ft-dropdown">'+
										'<div class="ft-select-sr" role="button" data-toggle="tooltip" data-placement="top" data-original-title="" title="" data-search="ms-ft-inputfilter-a-'+numitem+'"></div>'+
										'<div class="dropdown-menu ms-dw-ft"></div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-source-'+numitem+'" id="ft-ld-source-c-'+numitem+'"/>'+
								'<label for="ft-ld-source-c-'+numitem+'">exclude any</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-source-'+numitem+'" id="ft-ld-source-d-'+numitem+'"/>'+
								'<label for="ft-ld-source-d-'+numitem+'">are empty</label>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			break;
		//PROPERTY TYPE
		case 'ft-pd-property':
			$(".ms-body-lead-filters").prepend(
				'<div class="ms-wp-ft-ct active" id="ft-item-'+numitem+'">'+
					'<div class="ms-wp-ft-ct-hd">'+
						'<div class="ms-tb-panel">'+
							'<span class="ms-title ico-property">Property Type</span>'+
						'</div>'+
						'<div class="ms-wrap-close"><a class="ms-close-panel" data-toggle="tooltip" data-placement="left" title="Remove" data-id="ft-item-'+numitem+'"></a></div>'+
					'</div>'+
					'<div class="ms-wp-ft-ct-bd">'+
						'<div class="ms-wrap-checkbox">'+
							'<input type="checkbox" name="propertyType" class="js-property-type-alert" id="house-'+numitem+'" value="house">'+
							'<label for="house-'+numitem+'">Single Family Homes</label>'+
						'</div>'+
						'<div class="ms-wrap-checkbox">'+
							'<input type="checkbox" name="propertyType" class="js-property-type-alert" id="condo-'+numitem+'" value="condo">'+
							'<label for="condo-'+numitem+'">Condominiums</label>'+
						'</div>'+
						'<div class="ms-wrap-checkbox">'+
							'<input type="checkbox" name="propertyType" class="js-property-type-alert" id="townhouse-'+numitem+'" value="townhouse">'+
							'<label for="townhouse-'+numitem+'">Townhouses</label>'+
						'</div>'+
						'<div class="ms-wrap-checkbox">'+
							'<input type="checkbox" name="propertyType" class="js-property-type-alert" id="multifamily-'+numitem+'" value="multifamily">'+
							'<label for="multifamily-'+numitem+'">Multi-Family</label>'+
						'</div>'+
						'<div class="ms-wrap-checkbox">'+
							'<input type="checkbox" name="propertyType" class="js-property-type-alert" id="vacantland-'+numitem+'" value="vacantland">'+
							'<label for="vacantland-'+numitem+'">Vacant Land</label>'+
						'</div>'+
						'<div class="ms-wrap-checkbox">'+
							'<input type="checkbox" name="propertyType" class="js-property-type-alert" id="commercial-'+numitem+'" value="Commercial">'+
							'<label for="commercial-'+numitem+'">Commercial</label>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			break;
		//TRANSACTION TYPE
		case 'ft-pd-transaction':
			$(".ms-body-lead-filters").prepend(
				'<div class="ms-wp-ft-ct active" id="ft-item-'+numitem+'">'+
					'<div class="ms-wp-ft-ct-hd">'+
						'<div class="ms-tb-panel">'+
							'<span class="ms-title ico-transaction">Transaction Type</span>'+
						'</div>'+
						'<div class="ms-wrap-close"><a class="ms-close-panel" data-toggle="tooltip" data-placement="left" title="Remove" data-id="ft-item-'+numitem+'"></a></div>'+
					'</div>'+
					'<div class="ms-wp-ft-ct-bd">'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-transaction-'+numitem+'" id="ft-ld-transaction-a-'+numitem+'"/>'+
								'<label for="ft-ld-transaction-a-'+numitem+'">For Sale</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-transaction-'+numitem+'" id="ft-ld-transaction-b-'+numitem+'"/>'+
								'<label for="ft-ld-transaction-b-'+numitem+'">For rent</label>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			break;
		//PRICE
		case 'ft-pd-price':
			$(".ms-body-lead-filters").prepend(
				'<div class="ms-wp-ft-ct active" id="ft-item-'+numitem+'">'+
					'<div class="ms-wp-ft-ct-hd">'+
						'<div class="ms-tb-panel">'+
							'<span class="ms-title ico-transaction">Price</span>'+
						'</div>'+
						'<div class="ms-wrap-close"><a class="ms-close-panel" data-toggle="tooltip" data-placement="left" title="Remove" data-id="ft-item-'+numitem+'"></a></div>'+
					'</div>'+
					'<div class="ms-wp-ft-ct-bd">'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-price-'+numitem+'" id="ft-ld-price-a-'+numitem+'"/>'+
								'<label for="ft-ld-price-a-'+numitem+'">is not empty</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-price-'+numitem+'" id="ft-ld-price-b-'+numitem+'"/>'+
								'<label for="ft-ld-price-b-'+numitem+'">is less than</label>'+
								'<div class="ms-wrap-contains">'+
									'<input type="text" class="ms-input">'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-price-'+numitem+'" id="ft-ld-price-c-'+numitem+'"/>'+
								'<label for="ft-ld-price-c-'+numitem+'">is greater than</label>'+
								'<div class="ms-wrap-contains">'+
									'<input type="text" class="ms-input">'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-price-'+numitem+'" id="ft-ld-price-d-'+numitem+'"/>'+
								'<label for="ft-ld-price-d-'+numitem+'">is between</label>'+
								'<div class="ms-wrap-contains ms-flex">'+
									'<input type="text" class="ms-input ms-md">'+
									'<input type="text" class="ms-input ms-md">'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-price-'+numitem+'" id="ft-ld-price-e-'+numitem+'"/>'+
								'<label for="ft-ld-price-e-'+numitem+'">is empty</label>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			break;
		//SOURCE
		case 'ft-pd-source':
			$(".ms-body-lead-filters").prepend(
				'<div class="ms-wp-ft-ct active" id="ft-item-'+numitem+'">'+
					'<div class="ms-wp-ft-ct-hd">'+
						'<div class="ms-tb-panel">'+
							'<span class="ms-title ico-source">Source</span>'+
						'</div>'+
						'<div class="ms-wrap-close"><a class="ms-close-panel" data-toggle="tooltip" data-placement="left" title="Remove" data-id="ft-item-'+numitem+'"></a></div>'+
					'</div>'+
					'<div class="ms-wp-ft-ct-bd">'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-source-'+numitem+'" id="ft-ld-source-a-'+numitem+'"/>'+
								'<label for="ft-ld-source-a-'+numitem+'">are not empty</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-source-'+numitem+'" id="ft-ld-source-b-'+numitem+'"/>'+
								'<label for="ft-ld-source-b-'+numitem+'">include any</label>'+
								'<div class="ms-wrap-ft-select-sr">'+
									'<div class="ms-wrap-ft-dropdown">'+
										'<div class="ft-select-sr" role="button" data-toggle="tooltip" data-placement="top" data-original-title="" title="" data-search="ms-ft-inputfilter-a-'+numitem+'"></div>'+
										'<div class="dropdown-menu ms-dw-ft"></div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-source-'+numitem+'" id="ft-ld-source-c-'+numitem+'"/>'+
								'<label for="ft-ld-source-c-'+numitem+'">exclude any</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-source-'+numitem+'" id="ft-ld-source-d-'+numitem+'"/>'+
								'<label for="ft-ld-source-d-'+numitem+'">are empty</label>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			break;
		//MLS AGENT ID
		case 'ft-pd-agent-id':
			$(".ms-body-lead-filters").prepend(
				'<div class="ms-wp-ft-ct active" id="ft-item-'+numitem+'">'+
					'<div class="ms-wp-ft-ct-hd">'+
						'<div class="ms-tb-panel">'+
							'<span class="ms-title ico-agent">MLS Agent ID</span>'+
						'</div>'+
						'<div class="ms-wrap-close"><a class="ms-close-panel" data-toggle="tooltip" data-placement="left" title="Remove" data-id="ft-item-'+numitem+'"></a></div>'+
					'</div>'+
					'<div class="ms-wp-ft-ct-bd">'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-agentid-'+numitem+'" id="ft-ld-agentid-a-'+numitem+'"/>'+
								'<label for="ft-ld-agentid-a-'+numitem+'">is not empty</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-agentid-'+numitem+'" id="ft-ld-agentid-b-'+numitem+'"/>'+
								'<label for="ft-ld-agentid-b-'+numitem+'">contains</label>'+
								'<div class="ms-wrap-contains">'+
									'<div class="ms-group-btn">'+
										'<input type="text" class="ms-input">'+
										'<a class="ms-btn-add ms-blur">Add</a>'+
									'</div>'+
									'<div class="ms-blur-list"></div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			break;
		//MLS OFFICE ID
		case 'ft-pd-office-id':

			$(".ms-body-lead-filters").prepend(
				'<div class="ms-wp-ft-ct active" id="ft-item-'+numitem+'">'+
					'<div class="ms-wp-ft-ct-hd">'+
						'<div class="ms-tb-panel">'+
							'<span class="ms-title ico-officeid">MLS Office ID</span>'+
						'</div>'+
						'<div class="ms-wrap-close"><a class="ms-close-panel" data-toggle="tooltip" data-placement="left" title="Remove" data-id="ft-item-'+numitem+'"></a></div>'+
					'</div>'+
					'<div class="ms-wp-ft-ct-bd">'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-officeid-'+numitem+'" id="ft-ld-officeid-a-'+numitem+'"/>'+
								'<label for="ft-ld-officeid-a-'+numitem+'">is not empty</label>'+
							'</div>'+
						'</div>'+
						'<div class="ms-wrap-radio">'+
							'<div class="ms-wrap-ck">'+
								'<input type="radio" name="ft-ld-officeid-'+numitem+'" id="ft-ld-officeid-b-'+numitem+'"/>'+
								'<label for="ft-ld-officeid-b-'+numitem+'">contains</label>'+
								'<div class="ms-wrap-contains">'+
									'<div class="ms-group-btn">'+
										'<input type="text" class="ms-input">'+
										'<a class="ms-btn-add ms-blur">Add</a>'+
									'</div>'+
									'<div class="ms-blur-list"></div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			break;
	}
	$('[data-toggle="tooltip"]').tooltip();
}

var dataTagList = ["Tag Name 1","Tag Name 2","Tag Name 3","Tag Name 4","Tag Name 5"];

function loadSelectFilter(selectFilter, parentPrint, parentWrapper, searchFilter){

	parentPrint.html('<div class="ms-header-dw-ft"><input type="text" class="'+searchFilter+'"></div>');
	var searchFilterGen = $("."+searchFilter);

	switch (selectFilter) {
		//TAGS
		case 'tagFilter':
			searchFilterGen.autocomplete({
				source: dataTagList,
				minLength: 0,
				appendTo: parentPrint,
				select: function( event, ui ) {
					var tagList = "";
					parentWrapper.removeClass("temp-open open");
					var parentList = jQuery(this).parents(".ms-wrap-ft-select-sr");
					parentList.addClass("active-list");
					tagList = '<span class="ms-ft-tag-item-btn" data-value="'+ui.item.value+'">'+ui.item.value+'</span>'+tagList;
					parentList.prepend(tagList);
					parentList.find(".ft-select-sr").attr("data-original-title","Add Tags");
					$(this).parents(".ms-wrap-ck").find('input[type="radio"]').trigger("click");
					dataTagList.splice($.inArray(ui.item.value,dataTagList),1);
					var dataTagListCount = dataTagList.length;
					if(dataTagListCount < 1){
						parentList.find(".ms-wrap-ft-dropdown").fadeOut('fast');
					}
				}
			}).focus(function(){
        if (this.value == ""){
          jQuery(this).autocomplete("search");
        }
			}).focus();
			break;
	}
}
