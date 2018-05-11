<template>
  <div class="class-category">
    <ul>
      <li :class="{active: active === item.subjectId||active === item.id}" v-for="item in allSubjects" @click="handleClick(item.subjectId||item.id)">{{item.subjectName||item.name}}</li>
    </ul>
  </div>
</template>

<script>
  import io from '../../lib/io'

export default {
  name: 'class-category',
  components: {
  },
  data() {
    return {
      active: '',
      allSubjects: [],
    }
  },
  created() {
    this.getOrganizationBaseConfig()
  },
  mounted() {
  },
  methods: {
    getOrganizationBaseConfig() {
      io.post(io.organizationBaseConfig, {}, (data) => {
        this.allSubjects = data.subjects;
        this.active = data.subjects[0].subjectId
        this.handleClick(this.active)
      })
    },
    handleClick(value) {
      this.active = value
      this.$emit('getSubjectId', { subjectId: value })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.class-category {
  width: 150px;
  text-align: center;
  border: 1px solid #bbdde7;
  ul {
    padding: 0;
    margin: 0;
    li {
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #333333;
      width: 100%;
      cursor: pointer;
      &.active {
        background-color: #92e1dd;
      }
    }
    li+li {
      border-top: 1px solid #bbdde7;
    }
  }
}
</style>
