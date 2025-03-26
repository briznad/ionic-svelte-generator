<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let animated: boolean = "true";
  export let backdropDismiss: boolean = "true";
  export let buttons: any = "[]";
  export let cssClass: string | undefined = undefined;
  export let enterAnimation: any = undefined;
  export let header: string | undefined = undefined;
  export let htmlAttributes: string | undefined = undefined;
  export let isOpen: boolean = "false";
  export let keyboardClose: boolean = "true";
  export let leaveAnimation: any = undefined;
  export let mode: any = undefined;
  export let subHeader: string | undefined = undefined;
  export let translucent: boolean = "false";
  export let trigger: string | undefined = undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  didDismiss: CustomEvent<OverlayEventDetail<any>>;
  didPresent: CustomEvent<void>;
  ionActionSheetDidDismiss: CustomEvent<OverlayEventDetail<any>>;
  ionActionSheetDidPresent: CustomEvent<void>;
  ionActionSheetWillDismiss: CustomEvent<OverlayEventDetail<any>>;
  ionActionSheetWillPresent: CustomEvent<void>;
  willDismiss: CustomEvent<OverlayEventDetail<any>>;
  willPresent: CustomEvent<void>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['didDismiss', 'didPresent', 'ionActionSheetDidDismiss', 'ionActionSheetDidPresent', 'ionActionSheetWillDismiss', 'ionActionSheetWillPresent', 'willDismiss', 'willPresent'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['didDismiss', 'didPresent', 'ionActionSheetDidDismiss', 'ionActionSheetDidPresent', 'ionActionSheetWillDismiss', 'ionActionSheetWillPresent', 'willDismiss', 'willPresent'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-action-sheet
  bind:this={element}
  animated={animated}
  backdropDismiss={backdropDismiss}
  buttons={buttons}
  cssClass={cssClass}
  enterAnimation={enterAnimation}
  header={header}
  htmlAttributes={htmlAttributes}
  isOpen={isOpen}
  keyboardClose={keyboardClose}
  leaveAnimation={leaveAnimation}
  mode={mode}
  subHeader={subHeader}
  translucent={translucent}
  trigger={trigger}
  {...$$restProps}
>
  <slot />
  
</ion-action-sheet>
