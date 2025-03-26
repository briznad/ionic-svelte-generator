<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let animated: boolean = "false";
  export let autocapitalize: string = "'off'";
  export let autocomplete: any = "'off'";
  export let autocorrect: any = "'off'";
  export let cancelButtonIcon: string = "config.get('backButtonIcon', arrowBackSharp) as string";
  export let cancelButtonText: string = "'Cancel'";
  export let clearIcon: string | undefined = undefined;
  export let color: string | undefined = undefined;
  export let debounce: number | undefined = undefined;
  export let disabled: boolean = "false";
  export let enterkeyhint: any = undefined;
  export let inputmode: any = undefined;
  export let maxlength: number | undefined = undefined;
  export let minlength: number | undefined = undefined;
  export let mode: any = undefined;
  export let name: string = "this.inputId";
  export let placeholder: string = "'Search'";
  export let searchIcon: string | undefined = undefined;
  export let showCancelButton: any = "'never'";
  export let showClearButton: any = "'always'";
  export let spellcheck: boolean = "false";
  export let type: any = "'search'";
  export let value: string | undefined = "''";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionBlur: CustomEvent<void>;
  ionCancel: CustomEvent<void>;
  ionChange: CustomEvent<SearchbarChangeEventDetail>;
  ionClear: CustomEvent<void>;
  ionFocus: CustomEvent<void>;
  ionInput: CustomEvent<SearchbarInputEventDetail>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionBlur', 'ionCancel', 'ionChange', 'ionClear', 'ionFocus', 'ionInput'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionBlur', 'ionCancel', 'ionChange', 'ionClear', 'ionFocus', 'ionInput'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-searchbar
  bind:this={element}
  animated={animated}
  autocapitalize={autocapitalize}
  autocomplete={autocomplete}
  autocorrect={autocorrect}
  cancelButtonIcon={cancelButtonIcon}
  cancelButtonText={cancelButtonText}
  clearIcon={clearIcon}
  color={color}
  debounce={debounce}
  disabled={disabled}
  enterkeyhint={enterkeyhint}
  inputmode={inputmode}
  maxlength={maxlength}
  minlength={minlength}
  mode={mode}
  name={name}
  placeholder={placeholder}
  searchIcon={searchIcon}
  showCancelButton={showCancelButton}
  showClearButton={showClearButton}
  spellcheck={spellcheck}
  type={type}
  value={value}
  {...$$restProps}
>
  <slot />
  
</ion-searchbar>
