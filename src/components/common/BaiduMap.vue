<template>
  <div :id="id" style="
                width: 100%;
                height:500px;
                border: 1px solid #d2e6ef;
                overflow:hidden;">

  </div>
</template>

<script>
import BMap from 'BMap'
export default {
    data() {
        return{
          id: 'MyMap',
          point: '',
          detailAddress: ''
        }
    },
    props: [
        'geoLocation', 'address'
    ],
    watch: {
      geoLocation(newVal) {
          this.point = newVal
      },
      address(newVal) {
        this.detailAddress = newVal
        this.initMap()
      }
    },
    mounted() {
      this.initMap()
    },
    methods: {
      initMap() {
        let map = new BMap.Map(this.id);
        let point = new BMap.Point(this.point);
        map.centerAndZoom(point,12);
        // 创建地址解析器实例
        let myGeo = new BMap.Geocoder();
//         将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(this.detailAddress, function(point){
          if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point));
          }else{
            alert("您选择地址没有解析到结果!");
          }
        });
      }
    }
  }
</script>

<style scope lang="less">
  #allmap {
    width: 100%;height: 500px;overflow: hidden;margin:0;
  }
</style>
