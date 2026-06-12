<script lang="ts">
  import { Content, Footer, Header, Layout, Side } from '@any-design/anyui-svelte';
</script>

<div class="layout-demo">
  <div class="demo-block">
    <div class="demo-block__label">Side + Header / Content / Footer</div>
    <div class="demo-row" style="height: 240px;">
      <Layout hasSide>
        <Side width={90}>Side</Side>
        <Layout direction="vertical">
          <Header height={48}>Header</Header>
          <Content>Content</Content>
          <Footer height={40}>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Vertical Only</div>
    <div class="demo-row" style="height: 200px;">
      <Layout direction="vertical">
        <Header height={48}>Header</Header>
        <Content>Content</Content>
      </Layout>
    </div>
  </div>
</div>

<style>
  .layout-demo :global(.a-layout) {
    width: 100%;
    height: 100%;
  }
  .layout-demo :global(.a-layout-inner) {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary, #7388e6);
    color: var(--text-btn, #fff);
  }
  .layout-demo :global(.a-side) {
    background-color: var(--bg-light, #f3f4fa);
    color: var(--primary, #7388e6);
  }
  .layout-demo :global(.a-content) {
    background-color: var(--primary-80, rgba(115, 136, 230, 0.8));
  }
</style>
