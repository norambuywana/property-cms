function fnCreateAdminPropertyBlueprint() {

	var sPropertyBluePrint = '<div class="lbl-property table-row">\
											<div class="lbl-property-id no-table" hidden="true">{{id}}</div>\
											<div class="lbl-property-address no-table" hidden="true">{{address}}</div>\
											<div id="lbl-image-map-wrap-{{id}}" class="lbl-image-map-wrap">\
												<div id="lbl-property-map-{{id}}" class="lbl-property-map"></div>\
											</div>\
											<div class="lbl-property-full-address">\
												<div class="lbl-property-type no-table fa fa-fw fa-{{type-icon}}"><h5>{{type}}</h5></div>\
												<div class="no-table lbl-full-address-inner-wrap">\
													<div class="lbl-property-address-street no-table">{{street}}</div>\
													<div class="lbl-property-address-number no-table">{{number}}</div>\
												</div>\
												<div class="no-table lbl-full-address-inner-wrap">\
													<div class="lbl-property-address-postal-code no-table">{{postal-code}}</div>\
													<div class="lbl-property-address-city no-table">{{city}}</div>\
												</div>\
											</div>\
											<div class="lbl-property-price-wrap">\
												<p>Asking price</p>\
												<div class="lbl-property-price no-table">{{price}}</div>\
												<p>Deposit:</p>\
												<div class="lbl-property-deposit no-table">{{deposit}}</div>\
											</div>\
											<div class="lbl-property-event-wrap">\
												<div data-go-to="wdw-create-property" class="fa fa-edit fa-fw link no-table"></div>\
												<div class="fa fa-trash fa-fw btn-delete-property no-table"></div>\
												<div class="btn-show-single-property fa fa-fw no-table link" data-go-to="wdw-single-property"><p>Property</p></div>\
											</div>\
										</div>';
	return sPropertyBluePrint;

}



function fnCreateNormalPropertyBlueprint() {

	var sPropertyBluePrint = '<div class="lbl-property table-row">\
											<div class="lbl-property-id no-table" hidden="true">{{id}}</div>\
											<div class="lbl-property-address no-table" hidden="true">{{address}}</div>\
											<div id="lbl-image-map-wrap-{{id}}" class="lbl-image-map-wrap">\
												<div id="lbl-property-map-{{id}}" class="lbl-property-map"></div>\
											</div>\
											<div class="lbl-property-full-address">\
												<div class="lbl-property-type fa fa-fw fa-{{type-icon}}"><h5>{{type}}</h5></div>\
												<div class="no-table lbl-full-address-inner-wrap">\
													<div class="lbl-property-address-street no-table">{{street}}</div>\
													<div class="lbl-property-address-number no-table">{{number}}</div>\
												</div>\
												<div class="no-table lbl-full-address-inner-wrap">\
													<div class="lbl-property-address-postal-code no-table">{{postal-code}}</div>\
													<div class="lbl-property-address-city no-table">{{city}}</div>\
												</div>\
											</div>\
											<div class="lbl-property-price-wrap">\
												<p>Asking price</p>\
												<div class="lbl-property-price no-table">{{price}}</div>\
												<p>Deposit:</p>\
												<div class="lbl-property-deposit no-table">{{deposit}}</div>\
											</div>\
											<div class="lbl-property-event-wrap">\
												<div class="btn-show-single-property fa fa-fw no-table link" data-go-to="wdw-single-property"><p>Property</p></div>\
											</div>\
										</div>';
	return sPropertyBluePrint;

}


function fnCreateMapPropertyBlueprint() {

	var sPropertyBluePrint = '<div class="lbl-property lbl-map-info-wrap">\
											<div class="lbl-property-id no-table" hidden="true">{{id}}</div>\
											<div class="lbl-property-address no-table" hidden="true">{{address}}</div>\
											<div id="lbl-map-properties-image-wrap-{{id}}" class="lbl-map-image-wrap">\
											</div>\
											<div class="lbl-property-full-address no-table">\
												<div class="no-table lbl-full-address-inner-wrap">\
													<div class="lbl-property-address-street no-table">{{street}}</div>\
													<div class="lbl-property-address-number no-table">{{number}}</div>\
												</div>\
												<div class="no-table lbl-full-address-inner-wrap">\
													<div class="lbl-property-address-postal-code no-table">{{postal-code}}</div>\
													<div class="lbl-property-address-city no-table">{{city}}</div>\
												</div>\
											</div>\
											<div class="lbl-property-price-wrap no-table">\
												<p>Asking price</p>\
												<div class="lbl-property-price no-table">{{price}}</div>\
												<div class="lbl-property-deposit no-table" hidden="true">{{deposit}}</div>\
											</div>\
											<div class="lbl-property-event-wrap">\
												<div class="btn-show-single-property fa fa-fw no-table link" data-go-to="wdw-single-property"><p>Property</p></div>\
											</div>\
										</div>';
	return sPropertyBluePrint;
}




