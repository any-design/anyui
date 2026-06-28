<script lang="ts">
  import { OtpInput } from '@any-design/anyui-svelte';

  let code = $state('');
  let completed = $state('');
  let pin = $state('');
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">6-digit Code</div>
    <div class="demo-col">
      <OtpInput bind:modelValue={code} onComplete={(value) => (completed = value)} />
      <span>Value: {code || 'empty'}</span>
      <span>Completed: {completed || 'not yet'}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">4-digit Masked</div>
    <div class="demo-col">
      <OtpInput bind:modelValue={pin} length={4} masked />
      <span>Value: {pin || 'empty'}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Sizes</div>
    <div class="demo-row">
      <OtpInput modelValue="12" length={4} size="small" />
      <OtpInput modelValue="123" length={4} />
      <OtpInput modelValue="1234" length={4} size="large" />
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Disabled</div>
    <div class="demo-row">
      <OtpInput modelValue="12" length={4} disabled />
    </div>
  </div>
</div>
