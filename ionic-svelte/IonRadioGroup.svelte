<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let allowEmptySelection: boolean = "false";
  export let compareWith: string | undefined = undefined;
  export let errorText: string | undefined = undefined;
  export let helperText: string | undefined = undefined;
  export let name: string = "this.inputId";
  export let value: any = undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionChange: CustomEvent<RadioGroupChangeEventDetail<any>>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionChange'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionChange'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-radio-group
  bind:this={element}
  allowEmptySelection={allowEmptySelection}
  compareWith={compareWith}
  errorText={errorText}
  helperText={helperText}
  name={name}
  value={value}
  {...$$restProps}
>
  <slot />
  
</ion-radio-group>
