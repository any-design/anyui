<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Types</div>
      <div class="demo-col">
        <div class="list-view-wrapper">
          <a-list-view item-height="54px">
            <a-list-view-item label="Avatar"
              ><a-button type="primary">View</a-button></a-list-view-item
            >
            <a-list-view-item label="Nickname"><span>AnyUI</span></a-list-view-item>
            <a-list-view-item label="Email"><span>anyui@pwp.sh</span></a-list-view-item>
          </a-list-view>
        </div>
        <div class="list-view-wrapper">
          <a-list-view item-height="54px" type="bordered">
            <a-list-view-item label="Avatar"
              ><a-button type="primary">View</a-button></a-list-view-item
            >
            <a-list-view-item label="Nickname"><span>AnyUI</span></a-list-view-item>
            <a-list-view-item label="Email"><span>anyui@pwp.sh</span></a-list-view-item>
          </a-list-view>
        </div>
        <div class="list-view-wrapper">
          <a-list-view item-height="64px" type="deep">
            <a-list-view-item label="Avatar"
              ><a-button type="primary">View</a-button></a-list-view-item
            >
            <a-list-view-item label="Nickname"><span>AnyUI</span></a-list-view-item>
            <a-list-view-item label="Email"><span>anyui@pwp.sh</span></a-list-view-item>
          </a-list-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-view-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
}
</style>
