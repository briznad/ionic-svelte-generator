<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let autoGrow: boolean = "false";
  export let autocapitalize: string = "'none'";
  export let autofocus: boolean = "false";
  export let clearOnEdit: boolean = "false";
  export let color: string | undefined = undefined;
  export let cols: number | undefined = undefined;
  export let counter: boolean = "false";
  export let counterFormatter: string | undefined = undefined;
  export let debounce: number | undefined = undefined;
  export let disabled: boolean = "false";
  export let enterkeyhint: any = undefined;
  export let errorText: string | undefined = undefined;
  export let fill: any = undefined;
  export let helperText: string | undefined = undefined;
  export let inputmode: any = undefined;
  export let label: string | undefined = undefined;
  export let labelPlacement: any = "'start'";
  export let maxlength: number | undefined = undefined;
  export let minlength: number | undefined = undefined;
  export let mode: any = undefined;
  export let name: string = "this.inputId";
  export let placeholder: string | undefined = undefined;
  export let readonly: boolean = "false";
  export let required: boolean = "false";
  export let rows: number | undefined = undefined;
  export let shape: any = undefined;
  export let spellcheck: boolean = "false";
  export let value: string | undefined = "''";
  export let wrap: any = undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionBlur: CustomEvent<FocusEvent>;
  ionChange: CustomEvent<TextareaChangeEventDetail>;
  ionFocus: CustomEvent<FocusEvent>;
  ionInput: CustomEvent<TextareaInputEventDetail>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionBlur', 'ionChange', 'ionFocus', 'ionInput'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionBlur', 'ionChange', 'ionFocus', 'ionInput'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-textarea
  bind:this={element}
  autoGrow={autoGrow}
  autocapitalize={autocapitalize}
  autofocus={autofocus}
  clearOnEdit={clearOnEdit}
  color={color}
  cols={cols}
  counter={counter}
  counterFormatter={counterFormatter}
  debounce={debounce}
  disabled={disabled}
  enterkeyhint={enterkeyhint}
  errorText={errorText}
  fill={fill}
  helperText={helperText}
  inputmode={inputmode}
  label={label}
  labelPlacement={labelPlacement}
  maxlength={maxlength}
  minlength={minlength}
  mode={mode}
  name={name}
  placeholder={placeholder}
  readonly={readonly}
  required={required}
  rows={rows}
  shape={shape}
  spellcheck={spellcheck}
  value={value}
  wrap={wrap}
  {...$$restProps}
>
  <slot />
  <slot name="end" slot="end" />
  <slot name="label" slot="label" />
  <slot name="start" slot="start" />
</ion-textarea>
