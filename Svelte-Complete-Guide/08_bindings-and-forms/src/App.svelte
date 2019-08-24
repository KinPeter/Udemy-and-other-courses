<script>
	import CustomInput from './CustomInput.svelte';
	import Toggle from './Toggle.svelte';

	let val = '';
	let selectedOption = 1;
	let price = 0;
	let agreed;
	let favColor = 'blue';
	let otherFavColor = 'red';
	let favCars = ['audi'];
	let usernameInput;
	let justSomeDiv;
	let customInput; // bind:this also works on custom Svelte Components
	let enteredEmail = '';
	let formIsValid = false;

	$: console.log(val);
	$: console.log(selectedOption);
	$: console.log(price);
	$: console.log(agreed);
	$: console.log(favColor);
	$: console.log(favCars);
	$: console.log(otherFavColor);
	$: console.log(customInput);

	// reactive expression to validate email field
	$: if (isValidEmail(enteredEmail)) {
		formIsValid = true;
	} else {
		formIsValid = false;
	}

	function saveData() {
		console.log(usernameInput.value);
		console.dir(usernameInput); // the whole element
		console.dir(justSomeDiv); // the whole element
	}

	function isValidEmail(val) {
		return val.includes('@');
	}
</script>

<style>
	.invalid {
		background-color: rgba(255, 0, 0, 0.336);
	}
</style>

<!-- BIND TO CUSTOM COMPONENTS -->
<CustomInput bind:val={val} bind:this={customInput} />

<Toggle bind:chosenOption={selectedOption} />

<hr>

<!-- BIND TO NUMBER INPUTS -->
<!-- With long form two-way binding the input will remain STRING! -->
<!-- <input type="number" value={price} on:input={(event) => console.log('1' + event.target.value)}> -->
<!-- With bind:value syntax though it will bind to a NUMBER -->
<input type="number" bind:value={price} >

<hr>

<!-- BIND TO CHECKBOX -->
<label>
	<input type="checkbox" bind:checked={agreed} >
	Agree to terms?
</label>

<hr>

<!-- BIND TO CHECKBOX GROUPS -->
<h4>Favorite cars?</h4>
<label>
	<input type="checkbox" value="audi" name="car" bind:group={favCars}>
	Audi
</label>
<label>
	<input type="checkbox" value="porsche" name="car" bind:group={favCars}>
	Porsche
</label>
<label>
	<input type="checkbox" value="tesla" name="car" bind:group={favCars}>
	Tesla
</label>
<label>
	<input type="checkbox" value="hyundai" name="car" bind:group={favCars}>
	Hyundai
</label>

<hr>

<!-- BIND TO RADIO BUTTONS -->
<h4>Favorite color?</h4>
<label>
	<input type="radio" value="red" name="color" bind:group={favColor}>
	Red
</label>
<label>
	<input type="radio" value="green" name="color" bind:group={favColor}>
	Green
</label>
<label>
	<input type="radio" value="blue" name="color" bind:group={favColor}>
	Blue
</label>

<hr>

<!-- BIND TO SELECT DROPDOWNS -->
<label>Other favorite color?</label>
<select bind:value={otherFavColor}>
	<option value="blue">Blue</option>
	<option value="green">Green</option>
	<option value="red">Red</option>
</select>

<hr>

<!-- BIND TO ELEMENT REFERENCE -->
<!-- bind:this={variableName} will store a reference of this HTML element -->
<label>Enter username:</label>
<input type="text" bind:this={usernameInput}>
<button on:click={saveData}>Save</button>
<div bind:this={justSomeDiv}></div>

<hr>

<!-- CUSTOM FORM VALIDATION -->
<form on:submit|preventDefault>
	<label>Enter email:</label>
	<input type="email" bind:value={enteredEmail} class={isValidEmail(enteredEmail) ? null : 'invalid'}>
	<button type="submit" disabled={!formIsValid}>Save</button>
</form>