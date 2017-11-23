<div id="wdw-create-property" class="wdw">

	<h1>Create property</h1>

	
	<form id="frm-create-property" enctype="multipart/form-data" method="post">
	     
		<input id="txt-create-property-id" type="text" hidden="true" name="id">
		<input id="txt-create-property-address" data-min="6" data-max="100" class="validate" onFocus="geolocate()" type="text" placeholder="Address" name="address">
		<input id="txt-create-property-price"  data-min="0" data-max="9223372036854775807" class="validate validate-number" type="number" placeholder="Price" name="price">
		<input id="txt-create-property-deposit" data-min="0" data-max="9223372036854775807" class="validate validate-number" type="number"  placeholder="Deposit" name="deposit">
		<input id="txt-create-property-type" type="text"  placeholder="Type" name="type">

		
		<p class="lbl-image-txt">Upload at least 3 images</p>
		<div id="lbl-image-0" class="lbl-create-image-wrap">
			<input class="lbl-image-to-edit" type="text" name="image-edit-0" hidden="true">
			<img class="img-preview" src=""></img> 

			<div class="lbl-image-btn-wrap">
				<div class="lbl-create-property-image lbl-image-add">
					<input class="image-0" type="file" name="image-0">
				</div>
				<button class="btn-remove-property-image" type="button">Delete</button>
			</div>

		</div>
		<div id="lbl-create-images-wrap"></div>

		<button id="btn-save-property" type="button" name="submit">SAVE</button>
		
		<input id="txt-create-property-latlng" type="text" hidden="true" name="latlng"></input>



		<div id="lbl-property-hidden-address" hidden="true">
			<input class="property-hidden-field validate" id="street_number" data-min="0" data-max="100000" disabled="true" name="street_number"></input>
			<input class="property-hidden-field validate" id="route" data-min="2" data-max="50" disabled="true" name="street_name"></input>
			<input class="property-hidden-field validate" id="locality" data-min="2" data-max="40" disabled="true" name="city"></input>
			<input class="property-hidden-field" id="administrative_area_level_1" disabled="true" name="state"></input>
			<input class="property-hidden-field validate validate-number" id="postal_code" data-min="2" data-max="8" disabled="true" name="postal_code"></input>
			<input class="property-hidden-field" id="country" disabled="true" name="country"></input>
		</div>
	</form>

</div>