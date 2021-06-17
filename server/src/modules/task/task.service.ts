import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';

const os = require('os')
@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  // @Cron('5 * * * * *')
  // @Interval(4000)
  monitor () {
    const memInfo = this.getMemoryUsage()
    console.log('memInfo',memInfo)
    this.getCPULoadavg().then(res => {
      console.log('cpuInfo',res)
    })
  }
  /**
   * 获取 内存 信息
   * @param { Boolean } （以百分比结果返回）
   * @returns { Object } 内存 信息
   */
  getMemoryUsage ( ) {
    const { rss, heapUsed, heapTotal } = process.memoryUsage()
    const sysFree = os.freemem()
    const sysTotal = os.totalmem();
    // return {
     let sys:any = (1 - sysFree / sysTotal)*100
     let heap:any =  heapUsed / heapTotal *100
     let node:any =  rss / sysTotal * 100
    // }
    return {
      sys:Number(sys).toFixed(2),
      heap:Number(heap).toFixed(2),
      node:Number(node).toFixed(2)
    }
  }

  sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  /**
   * 获取 CPU 信息
   * @returns { Object } CPU 信息
   */
  getCpuInfo () {
    const cpus = os.cpus();
    let user = 0, nice = 0, sys = 0, idle = 0, irq = 0, total = 0

    for (let cpu in cpus) {
      const times = cpus[cpu].times
      user += times.user
      nice += times.nice
      sys += times.sys
      idle += times.idle
      irq += times.irq
    }

    total += user + nice + sys + idle + irq

    return {
      user,
      sys,
      idle,
      total,
    }
  }
  /**
     * 获取某一时间段内的 CPU 利用率
     * @param { Number } Options.ms 默认是 1000ms
     * @param { Boolean } Options.percentage true（以百分比结果返回）| false(小数返回)
     * @returns { Promise } CPU 利用率
     */
  async getCPULoadavg (options = { cpuUsageMS: 1000 }) {
    const that = this;
    const { cpuUsageMS } = options
    const t1 = that.getCpuInfo()
    await this.sleep(cpuUsageMS)
    const t2 = that.getCpuInfo()
    const idle = t2.idle - t1.idle
    const total = t2.total - t1.total
    let usage = 1 - idle / total
    return (usage*100).toFixed(2)
  }

}
