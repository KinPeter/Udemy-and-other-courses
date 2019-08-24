<script>
	import { tick } from 'svelte';
	import Product from './Product.svelte';
	import Modal from './Modal.svelte';

	let products = [
		{
			id: 'p1',
			title: 'Book',
			price: 9.99
		}
	]

	let showModal = false;
	let closable = false;

	function addToCart(event) {
		console.log(event.detail);
	}
	function deleteProduct(event) {
		console.log(event.detail);
	}

	let text = 'select some text here and press tab to transform it';
	function transform(event) {
		if (event.which !== 9) { // 9: TAB key
			return;
		}
		event.preventDefault();

		const selectionStart = event.target.selectionStart;
		const selectionEnd = event.target.selectionEnd;
		const value = event.target.value;

		text = value.slice(0, selectionStart) + 
				value.slice(selectionStart, selectionEnd).toUpperCase() + 
				value.slice(selectionEnd);

		// after next DOM update it runs the code in .then() callback
		tick().then(() => {
			event.target.selectionStart = selectionStart;
			event.target.selectionEnd = selectionEnd;
		})
	}
</script>

<style>

</style>

{#each products as product}
<!-- Using "Spread Props" as a shortcut -->
<Product 
	{...product}
	on:add-to-cart="{addToCart}" 
	on:delete="{deleteProduct}" />
<!-- <Product 
	title={product.title} 
	price={product.price}
	on:add-to-cart="{addToCart}" 
	on:delete="{deleteProduct}" /> -->
{/each}

<button on:click="{() => {showModal = true}}">Show Modal</button>

{#if showModal}
<Modal 
	on:cancel="{() => {showModal = false}}" 
	on:close="{() => {showModal = false}}"
	let:didAgree={closable}> <!-- let:propName is a slot prop - to be passed to that slot which has it -->	
	<h1 slot="header">Hello!</h1>
	<p slot="content">This works!</p>
	<button slot="footer" disabled="{!closable}">Confirm</button>
</Modal>
{/if}

<hr>
<textarea rows="5" value="{text}" on:keydown="{transform}"></textarea>