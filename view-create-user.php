<div id="wdw-create-user" class="wdw">
	<h1>Create user</h1>

	<form id="frm-create-user" enctype="multipart/form-data">
		<input id="txt-create-user-id" type="text" hidden="true" name="id">
		<input id="txt-create-user-firstname" data-min="2" data-max="15" class="validate" type="text" placeholder="Firstname" name="firstname">
		<input id="txt-create-user-lastname" data-min="2" data-max="15" class="validate" type="text"  placeholder="Lastname" name="lastname">
		<input id="txt-create-user-email" data-min="2" data-max="40" class="validate validate-email" type="email"  placeholder="Email" name="email">
		<input id="txt-create-user-password" data-min="8" data-max="30" class="validate validate-password" type="password"  placeholder="Password" name="password">
		<input id="txt-create-user-role" type="text"  placeholder="Role" name="role">
		<button id="btn-save-user" type="button" name="submit">SAVE</button>
	</form>


</div>