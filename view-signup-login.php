<div id="wdw-signup-login">

	<div id="lbl-signup-login-txt">
		
		<h1>DreamHome Real Estate</h1>
	</div>


	<div id="lbl-signup-login">
		
		<form id="frm-user-signup">
			<input id="txt-signup-firstname" data-min="2" data-max="15" class="validate"  type="text" placeholder="First name (2-15 characters)" name="firstname"></input>
			<input id="txt-signup-lastname" data-min="2" data-max="15" class="validate" type="text" placeholder="Last Name 2-15 characters)" name="lastname"></input>
			<input id="txt-signup-email" class="validate validate-email" type="text" placeholder="Email" name="email"></input>
			<input id="txt-signup-password" data-min="8" data-max="20" class="validate validate-password" type="password" placeholder="Password. At least 8 characters, 1 capital and 1 number" name="password"></input>
			<input id="txt-signup-password-check" data-min="8" data-max="20" class="validate" type="password" placeholder="Retype password" name="password-check"></input>
			<button id="btn-signup" class="btn-signup-login" type="button" name="submit">SIGN UP</button>
		</form>

		
		<form id="frm-user-login" data-go-to="wdw-admin-menu">
			<input id="txt-login-email" class="validate" type="text" placeholder="Email" name="email"></input>
			<input id="txt-login-password" data-min="8" data-max="20" class="validate" type="password" placeholder="Password" name="password"></input>
			<button id="btn-login" class="btn-signup-login" type="button" name="submit">LOGIN</button>
		</form>

	</div>

</div>