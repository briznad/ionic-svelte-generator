<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let contentId: string | undefined = undefined;
  export let disabled: boolean = "false";
  export let maxEdgeStart: number = "50";
  export let menuId: string | undefined = undefined;
  export let side: any = "'start'";
  export let swipeGesture: boolean = "true";
  export let type: any = undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionDidClose: CustomEvent<MenuCloseEventDetail>;
  ionDidOpen: CustomEvent<void>;
  ionWillClose: CustomEvent<MenuCloseEventDetail>;
  ionWillOpen: CustomEvent<void>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionDidClose', 'ionDidOpen', 'ionWillClose', 'ionWillOpen'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionDidClose', 'ionDidOpen', 'ionWillClose', 'ionWillOpen'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-menu
  bind:this={element}
  contentId={contentId}
  disabled={disabled}
  maxEdgeStart={maxEdgeStart}
  menuId={menuId}
  side={side}
  swipeGesture={swipeGesture}
  type={type}
  {...$$restProps}
>
  <slot />
  
</ion-menu>
