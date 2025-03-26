<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let animated: boolean = "true";
  export let backdropBreakpoint: number = "0";
  export let backdropDismiss: boolean = "true";
  export let breakpoints: number | undefined = undefined;
  export let canDismiss: string | undefined = "true";
  export let enterAnimation: any = undefined;
  export let expandToScroll: boolean = "true";
  export let focusTrap: boolean = "true";
  export let handle: boolean | undefined = undefined;
  export let handleBehavior: any = "'none'";
  export let htmlAttributes: string | undefined = undefined;
  export let initialBreakpoint: number | undefined = undefined;
  export let isOpen: boolean = "false";
  export let keepContentsMounted: boolean = "false";
  export let keyboardClose: boolean = "true";
  export let leaveAnimation: any = undefined;
  export let mode: any = undefined;
  export let presentingElement: any = undefined;
  export let showBackdrop: boolean = "true";
  export let trigger: string | undefined = undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  didDismiss: CustomEvent<OverlayEventDetail<any>>;
  didPresent: CustomEvent<void>;
  ionBreakpointDidChange: CustomEvent<ModalBreakpointChangeEventDetail>;
  ionModalDidDismiss: CustomEvent<OverlayEventDetail<any>>;
  ionModalDidPresent: CustomEvent<void>;
  ionModalWillDismiss: CustomEvent<OverlayEventDetail<any>>;
  ionModalWillPresent: CustomEvent<void>;
  willDismiss: CustomEvent<OverlayEventDetail<any>>;
  willPresent: CustomEvent<void>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['didDismiss', 'didPresent', 'ionBreakpointDidChange', 'ionModalDidDismiss', 'ionModalDidPresent', 'ionModalWillDismiss', 'ionModalWillPresent', 'willDismiss', 'willPresent'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['didDismiss', 'didPresent', 'ionBreakpointDidChange', 'ionModalDidDismiss', 'ionModalDidPresent', 'ionModalWillDismiss', 'ionModalWillPresent', 'willDismiss', 'willPresent'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-modal
  bind:this={element}
  animated={animated}
  backdropBreakpoint={backdropBreakpoint}
  backdropDismiss={backdropDismiss}
  breakpoints={breakpoints}
  canDismiss={canDismiss}
  enterAnimation={enterAnimation}
  expandToScroll={expandToScroll}
  focusTrap={focusTrap}
  handle={handle}
  handleBehavior={handleBehavior}
  htmlAttributes={htmlAttributes}
  initialBreakpoint={initialBreakpoint}
  isOpen={isOpen}
  keepContentsMounted={keepContentsMounted}
  keyboardClose={keyboardClose}
  leaveAnimation={leaveAnimation}
  mode={mode}
  presentingElement={presentingElement}
  showBackdrop={showBackdrop}
  trigger={trigger}
  {...$$restProps}
>
  <slot />
  <slot name="" slot="" />
</ion-modal>
