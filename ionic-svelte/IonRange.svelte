<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let activeBarStart: number | undefined = undefined;
  export let color: string | undefined = undefined;
  export let debounce: number | undefined = undefined;
  export let disabled: boolean = "false";
  export let dualKnobs: boolean = "false";
  export let label: string | undefined = undefined;
  export let labelPlacement: any = "'start'";
  export let max: number = "100";
  export let min: number = "0";
  export let mode: any = undefined;
  export let name: string = "this.rangeId";
  export let pin: boolean = "false";
  export let pinFormatter: any = "(value: number): number => Math.round(value)";
  export let snaps: boolean = "false";
  export let step: number = "1";
  export let ticks: boolean = "true";
  export let value: any = "0";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionBlur: CustomEvent<void>;
  ionChange: CustomEvent<RangeChangeEventDetail>;
  ionFocus: CustomEvent<void>;
  ionInput: CustomEvent<RangeChangeEventDetail>;
  ionKnobMoveEnd: CustomEvent<RangeKnobMoveEndEventDetail>;
  ionKnobMoveStart: CustomEvent<RangeKnobMoveStartEventDetail>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionBlur', 'ionChange', 'ionFocus', 'ionInput', 'ionKnobMoveEnd', 'ionKnobMoveStart'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionBlur', 'ionChange', 'ionFocus', 'ionInput', 'ionKnobMoveEnd', 'ionKnobMoveStart'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-range
  bind:this={element}
  activeBarStart={activeBarStart}
  color={color}
  debounce={debounce}
  disabled={disabled}
  dualKnobs={dualKnobs}
  label={label}
  labelPlacement={labelPlacement}
  max={max}
  min={min}
  mode={mode}
  name={name}
  pin={pin}
  pinFormatter={pinFormatter}
  snaps={snaps}
  step={step}
  ticks={ticks}
  value={value}
  {...$$restProps}
>
  <slot />
  <slot name="end" slot="end" />
  <slot name="label" slot="label" />
  <slot name="start" slot="start" />
</ion-range>
