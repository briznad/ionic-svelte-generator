<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let cancelText: string = "'Cancel'";
  export let color: string | undefined = undefined;
  export let compareWith: string | undefined = undefined;
  export let disabled: boolean = "false";
  export let errorText: string | undefined = undefined;
  export let expandedIcon: string | undefined = undefined;
  export let fill: any = undefined;
  export let helperText: string | undefined = undefined;
  export let interface: any = "'alert'";
  export let interfaceOptions: any = "{}";
  export let justify: any = undefined;
  export let label: string | undefined = undefined;
  export let labelPlacement: any = "'start'";
  export let mode: any = undefined;
  export let multiple: boolean = "false";
  export let name: string = "this.inputId";
  export let okText: string = "'OK'";
  export let placeholder: string | undefined = undefined;
  export let required: boolean = "false";
  export let selectedText: string | undefined = undefined;
  export let shape: any = undefined;
  export let toggleIcon: string | undefined = undefined;
  export let value: any = undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionBlur: CustomEvent<void>;
  ionCancel: CustomEvent<void>;
  ionChange: CustomEvent<SelectChangeEventDetail<any>>;
  ionDismiss: CustomEvent<void>;
  ionFocus: CustomEvent<void>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionBlur', 'ionCancel', 'ionChange', 'ionDismiss', 'ionFocus'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionBlur', 'ionCancel', 'ionChange', 'ionDismiss', 'ionFocus'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-select
  bind:this={element}
  cancelText={cancelText}
  color={color}
  compareWith={compareWith}
  disabled={disabled}
  errorText={errorText}
  expandedIcon={expandedIcon}
  fill={fill}
  helperText={helperText}
  interface={interface}
  interfaceOptions={interfaceOptions}
  justify={justify}
  label={label}
  labelPlacement={labelPlacement}
  mode={mode}
  multiple={multiple}
  name={name}
  okText={okText}
  placeholder={placeholder}
  required={required}
  selectedText={selectedText}
  shape={shape}
  toggleIcon={toggleIcon}
  value={value}
  {...$$restProps}
>
  <slot />
  <slot name="end" slot="end" />
  <slot name="label" slot="label" />
  <slot name="start" slot="start" />
</ion-select>
