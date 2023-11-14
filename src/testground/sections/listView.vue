<template>
  <div class="testground-content__item">
    <p class="testground-content-title">List Menu</p>
    <div class="testground-flex">
      <a-layout>
        <a-content>
          <div class="list-view-wrapper">
            <a-list-view item-height="54px">
              <a-list-view-item label="Avatar"
                ><a-button type="primary">View</a-button></a-list-view-item
              >
              <a-list-view-item label="Nickname"><span>AnyUI</span></a-list-view-item>
              <a-list-view-item label="Email"><span>anyui@pwp.app</span></a-list-view-item>
            </a-list-view>
          </div>
          <div class="list-view-wrapper">
            <a-list-view item-height="54px" type="bordered">
              <a-list-view-item label="Avatar"
                ><a-button type="primary">View</a-button></a-list-view-item
              >
              <a-list-view-item label="Nickname"><span>AnyUI</span></a-list-view-item>
              <a-list-view-item label="Email"><span>anyui@pwp.app</span></a-list-view-item>
            </a-list-view>
          </div>
          <div>
            <a-list-view item-height="64px" type="deep">
              <a-list-view-item label="Avatar"
                ><a-button type="primary">View</a-button></a-list-view-item
              >
              <a-list-view-item label="Nickname"><span>AnyUI</span></a-list-view-item>
              <a-list-view-item label="Email"><span>anyui@pwp.app</span></a-list-view-item>
            </a-list-view>
          </div>
        </a-content>
      </a-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import AListView, { ListViewItem as AListViewItem } from '@/packages/listView';
</script>

<style lang="scss" scoped>
.list-view-wrapper {
  width: 100%;
  height: 240px;
}
</style>
