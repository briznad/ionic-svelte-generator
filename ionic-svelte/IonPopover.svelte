<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let alignment: any = undefined;
  export let animated: boolean = "true";
  export let arrow: boolean = "true";
  export let backdropDismiss: boolean = "true";
  export let component: string | undefined = undefined;
  export let componentProps: string | undefined = undefined;
  export let dismissOnSelect: boolean = "false";
  export let enterAnimation: any = undefined;
  export let event: any = undefined;
  export let focusTrap: boolean = "true";
  export let htmlAttributes: string | undefined = undefined;
  export let isOpen: boolean = "false";
  export let keepContentsMounted: boolean = "false";
  export let keyboardClose: boolean = "true";
  export let leaveAnimation: any = undefined;
  export let mode: any = undefined;
  export let reference: any = "'trigger'";
  export let showBackdrop: boolean = "true";
  export let side: any = "'bottom'";
  export let size: any = "'auto'";
  export let translucent: boolean = "false";
  export let trigger: string | undefined = undefined;
  export let triggerAction: any = "'click'";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  didDismiss: CustomEvent<OverlayEventDetail<any>>;
  didPresent: CustomEvent<void>;
  ionPopoverDidDismiss: CustomEvent<OverlayEventDetail<any>>;
  ionPopoverDidPresent: CustomEvent<void>;
  ionPopoverWillDismiss: CustomEvent<OverlayEventDetail<any>>;
  ionPopoverWillPresent: CustomEvent<void>;
  willDismiss: CustomEvent<OverlayEventDetail<any>>;
  willPresent: CustomEvent<void>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['didDismiss', 'didPresent', 'ionPopoverDidDismiss', 'ionPopoverDidPresent', 'ionPopoverWillDismiss', 'ionPopoverWillPresent', 'willDismiss', 'willPresent'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['didDismiss', 'didPresent', 'ionPopoverDidDismiss', 'ionPopoverDidPresent', 'ionPopoverWillDismiss', 'ionPopoverWillPresent', 'willDismiss', 'willPresent'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-popover
  bind:this={element}
  alignment={alignment}
  animated={animated}
  arrow={arrow}
  backdropDismiss={backdropDismiss}
  component={component}
  componentProps={componentProps}
  dismissOnSelect={dismissOnSelect}
  enterAnimation={enterAnimation}
  event={event}
  focusTrap={focusTrap}
  htmlAttributes={htmlAttributes}
  isOpen={isOpen}
  keepContentsMounted={keepContentsMounted}
  keyboardClose={keyboardClose}
  leaveAnimation={leaveAnimation}
  mode={mode}
  reference={reference}
  showBackdrop={showBackdrop}
  side={side}
  size={size}
  translucent={translucent}
  trigger={trigger}
  triggerAction={triggerAction}
  {...$$restProps}
>
  <slot />
  <slot name="" slot="" />
</ion-popover>
