<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let cancelText: string = "'Cancel'";
  export let clearText: string = "'Clear'";
  export let color: string | undefined = "'primary'";
  export let dayValues: string | undefined = undefined;
  export let disabled: boolean = "false";
  export let doneText: string = "'Done'";
  export let firstDayOfWeek: number = "0";
  export let formatOptions: any = undefined;
  export let highlightedDates: string | undefined = undefined;
  export let hourCycle: any = undefined;
  export let hourValues: string | undefined = undefined;
  export let isDateEnabled: string | undefined = undefined;
  export let locale: string = "'default'";
  export let max: string | undefined = undefined;
  export let min: string | undefined = undefined;
  export let minuteValues: string | undefined = undefined;
  export let mode: any = undefined;
  export let monthValues: string | undefined = undefined;
  export let multiple: boolean = "false";
  export let name: string = "this.inputId";
  export let preferWheel: boolean = "false";
  export let presentation: any = "'date-time'";
  export let readonly: boolean = "false";
  export let showClearButton: boolean = "false";
  export let showDefaultButtons: boolean = "false";
  export let showDefaultTimeLabel: boolean = "true";
  export let showDefaultTitle: boolean = "false";
  export let size: any = "'fixed'";
  export let titleSelectedDatesFormatter: string | undefined = undefined;
  export let value: string | undefined = undefined;
  export let yearValues: string | undefined = undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionBlur: CustomEvent<void>;
  ionCancel: CustomEvent<void>;
  ionChange: CustomEvent<DatetimeChangeEventDetail>;
  ionFocus: CustomEvent<void>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionBlur', 'ionCancel', 'ionChange', 'ionFocus'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionBlur', 'ionCancel', 'ionChange', 'ionFocus'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-datetime
  bind:this={element}
  cancelText={cancelText}
  clearText={clearText}
  color={color}
  dayValues={dayValues}
  disabled={disabled}
  doneText={doneText}
  firstDayOfWeek={firstDayOfWeek}
  formatOptions={formatOptions}
  highlightedDates={highlightedDates}
  hourCycle={hourCycle}
  hourValues={hourValues}
  isDateEnabled={isDateEnabled}
  locale={locale}
  max={max}
  min={min}
  minuteValues={minuteValues}
  mode={mode}
  monthValues={monthValues}
  multiple={multiple}
  name={name}
  preferWheel={preferWheel}
  presentation={presentation}
  readonly={readonly}
  showClearButton={showClearButton}
  showDefaultButtons={showDefaultButtons}
  showDefaultTimeLabel={showDefaultTimeLabel}
  showDefaultTitle={showDefaultTitle}
  size={size}
  titleSelectedDatesFormatter={titleSelectedDatesFormatter}
  value={value}
  yearValues={yearValues}
  {...$$restProps}
>
  <slot />
  <slot name="buttons" slot="buttons" />
  <slot name="time-label" slot="time-label" />
  <slot name="title" slot="title" />
</ion-datetime>
