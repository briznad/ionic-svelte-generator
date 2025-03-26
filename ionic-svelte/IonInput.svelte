<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let autocapitalize: string = "'off'";
  export let autocomplete: any = "'off'";
  export let autocorrect: any = "'off'";
  export let autofocus: boolean = "false";
  export let clearInput: boolean = "false";
  export let clearInputIcon: string | undefined = undefined;
  export let clearOnEdit: boolean | undefined = undefined;
  export let color: string | undefined = undefined;
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
  export let max: string | undefined = undefined;
  export let maxlength: number | undefined = undefined;
  export let min: string | undefined = undefined;
  export let minlength: number | undefined = undefined;
  export let mode: any = undefined;
  export let multiple: boolean | undefined = undefined;
  export let name: string = "this.inputId";
  export let pattern: string | undefined = undefined;
  export let placeholder: string | undefined = undefined;
  export let readonly: boolean = "false";
  export let required: boolean = "false";
  export let shape: any = undefined;
  export let spellcheck: boolean = "false";
  export let step: string | undefined = undefined;
  export let type: any = "'text'";
  export let value: string | undefined = "''";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionBlur: CustomEvent<FocusEvent>;
  ionChange: CustomEvent<InputChangeEventDetail>;
  ionFocus: CustomEvent<FocusEvent>;
  ionInput: CustomEvent<InputInputEventDetail>;
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

<ion-input
  bind:this={element}
  autocapitalize={autocapitalize}
  autocomplete={autocomplete}
  autocorrect={autocorrect}
  autofocus={autofocus}
  clearInput={clearInput}
  clearInputIcon={clearInputIcon}
  clearOnEdit={clearOnEdit}
  color={color}
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
  max={max}
  maxlength={maxlength}
  min={min}
  minlength={minlength}
  mode={mode}
  multiple={multiple}
  name={name}
  pattern={pattern}
  placeholder={placeholder}
  readonly={readonly}
  required={required}
  shape={shape}
  spellcheck={spellcheck}
  step={step}
  type={type}
  value={value}
  {...$$restProps}
>
  <slot />
  <slot name="end" slot="end" />
  <slot name="label" slot="label" />
  <slot name="start" slot="start" />
</ion-input>
