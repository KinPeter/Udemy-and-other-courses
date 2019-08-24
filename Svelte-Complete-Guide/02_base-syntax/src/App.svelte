<script>
	import ContactCard from './ContactCard.svelte';

	let name = 'Peter';
	let age = 33;
	let job = 'developer';
	let description = 'Living in <span style="color:red">Budapest</span>';
	let image = 'https://media.licdn.com/dms/image/C5603AQHhLBTaCAETMw/profile-displayphoto-shrink_200_200/0?e=1571875200&v=beta&t=HCd1WwZfNWS_pVjm9SXiKP_Xj7E6Jt7lx51gh3tQAAI';

	// reactive variable syntax
	// anytime the variable "name" changes, all these code are executed
	$: uppercaseName = name.toUpperCase();
	$: console.log(name);
	$: if (name === 'Peti') {
		age = 31;
	}

	function incrementAge() {
		age++;
	}

	function changeName() {
		name = name === 'Peter' ? 'Peti' : 'Peter';
	}

	function nameInput(event) {
		name = event.target.value;
	}
</script>

<style>
	h1 {
		color: purple;
	}
    textarea, input {
		display: block;
		width: 300px;
		border: none;
		background-color: #fff;
		outline: none;
		margin: 1rem 0;
		padding: .5rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
</style>

<h1>Hello, I'm {uppercaseName}, my age is {age}!</h1>
<button on:click="{incrementAge}">Change Age</button>
<button on:click="{changeName}">Change Name</button>

<form>
<!-- Two-way binding -->
	<!-- <input type="text" value="{name}" on:input="{nameInput}"> -->
	<input type="text" placeholder="Name" bind:value="{name}"> <!-- shortcut -->
	<input type="text" placeholder="Job" bind:value="{job}"> 
	<textarea rows="3" placeholder="Description" bind:value="{description}"></textarea>
	<input type="text" placeholder="Image URL" bind:value="{image}"> 
</form>

<ContactCard 
	userName="{name}" 
	jobTitle="{job}" 
	{description}
	userImage="{image}" />
<!-- {description} is a shortcut if the prop and variable names are the same -->