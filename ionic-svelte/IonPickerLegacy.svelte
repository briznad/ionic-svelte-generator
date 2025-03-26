<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let animated: boolean = "true";
  export let backdropDismiss: boolean = "true";
  export let buttons: any = "[]";
  export let columns: any = "[]";
  export let cssClass: string | undefined = undefined;
  export let duration: number = "0";
  export let enterAnimation: any = undefined;
  export let htmlAttributes: string | undefined = undefined;
  export let isOpen: boolean = "false";
  export let keyboardClose: boolean = "true";
  export let leaveAnimation: any = undefined;
  export let mode: any = undefined;
  export let showBackdrop: boolean = "true";
  export let trigger: string | undefined = undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  didDismiss: CustomEvent<OverlayEventDetail<any>>;
  didPresent: CustomEvent<void>;
  ionPickerDidDismiss: CustomEvent<OverlayEventDetail<any>>;
  ionPickerDidPresent: CustomEvent<void>;
  ionPickerWillDismiss: CustomEvent<OverlayEventDetail<any>>;
  ionPickerWillPresent: CustomEvent<void>;
  willDismiss: CustomEvent<OverlayEventDetail<any>>;
  willPresent: CustomEvent<void>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['didDismiss', 'didPresent', 'ionPickerDidDismiss', 'ionPickerDidPresent', 'ionPickerWillDismiss', 'ionPickerWillPresent', 'willDismiss', 'willPresent'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['didDismiss', 'didPresent', 'ionPickerDidDismiss', 'ionPickerDidPresent', 'ionPickerWillDismiss', 'ionPickerWillPresent', 'willDismiss', 'willPresent'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-picker-legacy
  bind:this={element}
  animated={animated}
  backdropDismiss={backdropDismiss}
  buttons={buttons}
  columns={columns}
  cssClass={cssClass}
  duration={duration}
  enterAnimation={enterAnimation}
  htmlAttributes={htmlAttributes}
  isOpen={isOpen}
  keyboardClose={keyboardClose}
  leaveAnimation={leaveAnimation}
  mode={mode}
  showBackdrop={showBackdrop}
  trigger={trigger}
  {...$$restProps}
>
  <slot />
  
</ion-picker-legacy>
