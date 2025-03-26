<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let animated: boolean = "true";
  export let disabled: boolean = "false";
  export let expand: any = "'compact'";
  export let mode: any = undefined;
  export let multiple: boolean | undefined = undefined;
  export let readonly: boolean = "false";
  export let value: string | undefined = undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionChange: CustomEvent<AccordionGroupChangeEventDetail<any>>;
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

<ion-accordion-group
  bind:this={element}
  animated={animated}
  disabled={disabled}
  expand={expand}
  mode={mode}
  multiple={multiple}
  readonly={readonly}
  value={value}
  {...$$restProps}
>
  <slot />
  
</ion-accordion-group>
