<script>
  import CartItem from "./CartItem.svelte";
  import cartItems from './cart-store.js';
  import { onDestroy } from 'svelte';
  import timer from '../timer-store.js';

  const timerUnsubscribe = timer.subscribe((count) => {
    console.log('Cart: ' + count);
  });

  onDestroy(() => {
    if (timerUnsubscribe) {
      timerUnsubscribe();
    }
  })

  // let items;

  // // the .subscribe() method returns the unsubscribing function
  // const unsubscribe = cartItems.subscribe((itemsInCart) => {
  //   items = itemsInCart;
  // });

  // onDestroy(() => {
  //   if (unsubscribe) {
  //     unsubscribe();
  //   }
  // })

</script>

<style>
  section {
    width: 30rem;
    max-width: 90%;
    margin: 2rem auto;
    border-bottom: 2px solid #ccc;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

<section>
  <h1>Cart</h1>
  <ul>
    <!-- {#each items as item (item.id + new Date())} -->

    <!-- $storeName is a SHORTCUT for subscribe -> extract data -> unsubscribe -->
    {#each $cartItems as item (item.id + new Date().getTime().toString())}
      <CartItem id={item.id} title={item.title} price={item.price} />
    {:else}
      <p>No items in cart yet!</p>
    {/each}
  </ul>
</section>
