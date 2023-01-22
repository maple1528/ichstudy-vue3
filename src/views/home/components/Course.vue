<template>
  <div class="content flex-column-center">
    <h2>{{ $t('navList.course') }}</h2>
    <div class="main">
      <div class="card" v-for="item in list">
        <div class="box">
          <div class="img-box">
            <img :src="item.imgUrl" alt="">
          </div>
          <div class="content-box">
            <div>
              <h2>{{ currentLocale === 'zh-CN' ? item.cnTitle : item.enTitle }}</h2>
              <p>{{ currentLocale === 'zh-CN' ? item.cnInfo : item.enInfo }}</p>
              <button>{{ $t('context.more') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="more">{{ $t('context.more') }}</button>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import useLocale from '@/hook/useLocale'
const { currentLocale } = useLocale()

interface IData {
  imgUrl: string,
  cnTitle: string,
  enTitle: string,
  cnInfo: string,
  enInfo: string
}

const list = ref([] as IData[])

list.value = [
  {
    imgUrl: "https://api.ichstudy.com/fstream/?endata={'filetype':'img','filename':'zsyh/zsyh.png'}",
    cnTitle: '舟山海洋文化',
    enTitle: 'Zhoushan',
    cnInfo: '舟山人因海而生、因海而兴，在漫长的历史长河中，在长期的生产、生活中创造了独具特色的舟山海洋文化。',
    enInfo: 'Zhoushan people were born and prospered because of the sea. In the long history, in the long production and life, Zhoushan people created a unique Zhoushan marine culture.'
  },
  {
    imgUrl: "https://api.ichstudy.com/fstream/?endata={'filetype':'img','filename':'lqqc/Snipaste_2022-05-19_15-28-52.png'}",
    cnTitle: '龙泉青瓷',
    enTitle: 'Longquan celadon',
    cnInfo: '龙泉青瓷是中国乃至世界陶瓷史上烧制年代最长、窑址分布最广、产品质量要求最高、生产规模和外销范围最大的青瓷历史名窑之一。',
    enInfo: 'The Longquan celadon is one of the historical famous celadon kilns with the longest firing age, the widest distribution of kilns, the highest product quality requirements, and the largest production scale and export scope in the history of ceramics in China and even the world.'
  },
  {
    imgUrl: "https://api.ichstudy.com/fstream/?endata={'filetype':'img','filename':'mr/Snipaste_2022-05-19_15-15-37.png'}",
    cnTitle: '苗染',
    enTitle: 'Miao ran',
    cnInfo: '苗染作为苗族手工艺品的重要组成部分，承载着太多先人所给予的厚望，每一张染布，每一次印染都蕴含着深刻的含义。',
    enInfo: `As an important part of Miao people's dyeing, each piece of Miao people's dyeing contains too much meaning.`
  },
  {
    imgUrl: "https://api.ichstudy.com/fstream/?endata={'filetype':'img','filename':'sj/sj.png'}",
    cnTitle: '畲间',
    enTitle: 'a Way to Get to Know Shanha',
    cnInfo: '本片借“云鹤水岸”这一极具畲族特色的乡间民宿，引起人们对于畲族这个民族的认识兴趣，呼吁人们重视畲族正在消失的文化。',
    enInfo: `his film uses "Yunhe Shuian", a rural home stay with the characteristics of the She nationality, to arouse people's interest in the understanding of the She nationality and call on people to pay attention to the disappearing culture of the She nationality.`
  },
]

</script>

<style scoped lang='less'>
.content {
  height: 100vh;
  width: 100%;
}

.main {
  height: 60%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.more {
  border-radius: 30px;
  width: 150px;
}

.card {
  position: relative;
  width: 200px;
  height: 80%;
  margin: 20px;
  transform-style: preserve-3d;
  perspective: 1000px;

  .box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: 1s ease;

    .img-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 8px;
      }
    }

    .content-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      background-color: #382321;
      backface-visibility: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      transform-style: preserve-3d;
      transform: rotateY(180deg);

      div {
        transform-style: preserve-3d;
        border-radius: 8px;
        padding: 20px 30px;
        background: #73615d;
        transform: translateZ(80px);

        h2 {
          color: #FFF;
          font-size: 20px;
        }

        p {
          width: 100%;
          color: #FFF;
          font-size: 14px;
        }

        button {
          background: #382321;
        }
      }
    }
  }
}

.card:hover .box {
  transform: rotateY(180deg);
}


</style>
