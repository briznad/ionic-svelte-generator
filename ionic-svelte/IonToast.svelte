<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let animated: boolean = "true";
  export let buttons: string | undefined = undefined;
  export let color: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let duration: number = "config.getNumber('toastDuration', 0)";
  export let enterAnimation: any = undefined;
  export let header: string | undefined = undefined;
  export let htmlAttributes: string | undefined = undefined;
  export let icon: string | undefined = undefined;
  export let isOpen: boolean = "false";
  export let keyboardClose: boolean = "false";
  export let layout: any = "'baseline'";
  export let leaveAnimation: any = undefined;
  export let message: string | undefined = undefined;
  export let mode: any = undefined;
  export let position: any = "'bottom'";
  export let positionAnchor: string | undefined = undefined;
  export let swipeGesture: any = undefined;
  export let translucent: boolean = "false";
  export let trigger: string | undefined = undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  didDismiss: CustomEvent<OverlayEventDetail<any>>;
  didPresent: CustomEvent<void>;
  ionToastDidDismiss: CustomEvent<OverlayEventDetail<any>>;
  ionToastDidPresent: CustomEvent<void>;
  ionToastWillDismiss: CustomEvent<OverlayEventDetail<any>>;
  ionToastWillPresent: CustomEvent<void>;
  willDismiss: CustomEvent<OverlayEventDetail<any>>;
  willPresent: CustomEvent<void>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['didDismiss', 'didPresent', 'ionToastDidDismiss', 'ionToastDidPresent', 'ionToastWillDismiss', 'ionToastWillPresent', 'willDismiss', 'willPresent'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['didDismiss', 'didPresent', 'ionToastDidDismiss', 'ionToastDidPresent', 'ionToastWillDismiss', 'ionToastWillPresent', 'willDismiss', 'willPresent'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-toast
  bind:this={element}
  animated={animated}
  buttons={buttons}
  color={color}
  cssClass={cssClass}
  duration={duration}
  enterAnimation={enterAnimation}
  header={header}
  htmlAttributes={htmlAttributes}
  icon={icon}
  isOpen={isOpen}
  keyboardClose={keyboardClose}
  layout={layout}
  leaveAnimation={leaveAnimation}
  message={message}
  mode={mode}
  position={position}
  positionAnchor={positionAnchor}
  swipeGesture={swipeGesture}
  translucent={translucent}
  trigger={trigger}
  {...$$restProps}
>
  <slot />
  
</ion-toast>
