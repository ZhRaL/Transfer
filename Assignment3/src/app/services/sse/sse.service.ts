import {Injectable, NgZone} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
//import value from '*.json'
import {environment} from '../../../environments/environment'
import {InfoParticleModule} from "./info-particle.module";

@Injectable({
  providedIn: 'root'
})
export class SSEService {
  public remoteControlURL = environment.apiUrl + 'api/remote-control/';

  /**
   * Service responsible for receiving the needed data from external mirrors
   * @param ngZone
   * @param http
   */

  constructor(private ngZone: NgZone, public http: HttpClient) { }

  public async getActiveInfoParticles(cmName): Promise<InfoParticleModule[]> {
    const out = this.http.post<InfoParticleModule[]>(this.remoteControlURL + 'do', {
      cmName: cmName,
      cmCommand: {
        functionalityType: "FlowView",
        method: "public java.util.List org.sociotech.cmf3.remote.functionality.FlowViewFunctionality.getItemsInFlow()",
        methodName: "getItemsInFlow",
        parameters: [],
        returnValue: "interface java.util.List"
      },
    }, { responseType: 'json' }).toPromise().then(value => {
        const ret: InfoParticleModule[] = []
        for (const part of JSON.parse(JSON.stringify(value))){
          const id = part.id
          const name = part.name
          const partic = new InfoParticleModule(id, name)
          ret.push(partic)
        }
        return ret
      }, err => {
        console.log(err)
        return []
      })
    return await out
  }

  public async pushLogMessage(cmName, logMsg): Promise<number> {
    const out = await this.http.post<any>(this.remoteControlURL + 'do', {
      cmName,
      cmCommand: {
        functionalityType: "FlowView",
        method: 'public long org.sociotech.cmf3.remote.functionality.FlowViewFunctionality.pushLogMessage()',
        methodName: 'pushLogMessage',
        parameters: [ { parameterType: 'java.lang.String', parameterValue: logMsg } ],
        returnValue: "long"
      },
    }, {
      responseType: 'json'
    }).toPromise().then(value => {
      return JSON.parse(String(value))
    }, err => console.log(err))
    return out;
  }

  public async test(cmName) {
    const out = this.http.post<any>(this.remoteControlURL + 'do', {
      cmName,
      cmCommand: {
        functionalityType: 'Runtime',
        method: 'public java.util.Map org.sociotech.cmf3.remote.functionality.RuntimeFunctionality.getVmInfo()',
        methodName: 'getVmInfo',
        parameters: [],
        returnValue: 'interface java.util.Map'
      },
    }, {
      responseType: 'json'
    }).toPromise().then(value => {
      console.log(value)
      return value
    }, err => console.log(err))
    return out
  }

  public async getStartTime(cmName): Promise<number> {
    const out = await this.http.post<number>(this.remoteControlURL + 'do', {
      cmName,
      cmCommand: {
        functionalityType: 'Runtime',
        method: 'public long org.sociotech.cmf3.remote.functionality.RuntimeFunctionality.getStartTime()',
        methodName: 'getStartTime',
        parameters: [],
        returnValue: 'long'
      },
    }, {
      responseType: 'json'
    }).toPromise().then(value => {
      return JSON.parse(String(value))
    }, err => console.log(err))
    return out
  }

  public async getBuildName(cmName): Promise<string> {
    const out = await this.http.post<string>(this.remoteControlURL + 'do', {
      cmName,
      cmCommand: {
        functionalityType: 'Runtime',
        method: 'public String org.sociotech.cmf3.remote.functionality.RuntimeFunctionality.getBuildName()',
        methodName: 'getBuildName',
        parameters: [],
        returnValue: 'string'
      },
    }, {
      responseType: 'json'
    }).toPromise().then(value => {
      return String(value)
    }, err => console.log(err))
    return String(out)
  }

  public async getSysEnv(cmName): Promise<any>{
    const ret: string[] = []
    this.http.post<any>(this.remoteControlURL + 'do', {
      cmName: cmName,
      cmCommand: {
        functionalityType: "Runtime",
        method: "public java.util.Map org.sociotech.cmf3.remote.functionality.RuntimeFunctionality.getSystemEnv()",
        methodName: "getSystemEnv",
        parameters: [],
        returnValue: "interface java.util.Map"
      },
    }, {
      responseType: 'json'
    }).toPromise().then(value => {
      const computerName = value.COMPUTERNAME
      const NUMBER_OF_PROCESSORS = value.NUMBER_OF_PROCESSORS
      const OS = value.OS
      const PROCESSOR_ARCHITECTURE = value.PROCESSOR_ARCHITECTURE
      const PROCESSOR_IDENTIFIER = value.PROCESSOR_IDENTIFIER
      const PROCESSOR_LEVEL = value.PROCESSOR_LEVEL
      ret.push(
        'System Name: ' + computerName + ',--\n' +
        'Nr of Processors: ' + NUMBER_OF_PROCESSORS + ',--\n' +
        'OS: ' + OS + ',--\n' +
        'Processor architecture: ' + PROCESSOR_ARCHITECTURE + ',--\n' +
        'Processor identifier: ' + PROCESSOR_IDENTIFIER + ',--\n' +
        'Processor level: ' + PROCESSOR_LEVEL
    )
      return ret
    }, err => console.log(err))

    return ret
  }

  public async getMemoryUsed(cmName): Promise<number> {
    const out = await this.http.post<any>(this.remoteControlURL + 'do', {
      cmName: cmName,
      cmCommand: {
        functionalityType: "Runtime",
        method: "public long org.sociotech.cmf3.remote.functionality.RuntimeFunctionality.getMemoryUsed()",
        methodName: "getMemoryUsed",
        parameters: [],
        returnValue: "long"
      },
    }, {
      responseType: 'json'
    }).toPromise().then(value => {
      return JSON.parse(value)
    }, err => console.log(err))
    return out
  }

  public async getCpuLoad(cmName): Promise<number> {
    const out = await this.http.post<any>(this.remoteControlURL + 'do', {
      cmName,
      cmCommand: {
        functionalityType: 'Runtime',
        method: 'public double org.sociotech.cmf3.remote.functionality.RuntimeFunctionality.getCpuLoad()',
        methodName: 'getCpuLoad',
        parameters: [],
        returnValue: 'double'
      },
    }, {
      responseType: 'json'
    }).toPromise().then(value => {
      return JSON.parse(value)
    }, err => console.log(err))
    return out
  }

  public async getLoadedClasses(cmName): Promise<number> {
    const out = await this.http.post<any>(this.remoteControlURL + 'do', {
      cmName,
      cmCommand: {
        functionalityType: 'Runtime',
        method: 'public double org.sociotech.cmf3.remote.functionality.RuntimeFunctionality.getCpuLoad()',
        methodName: 'getCpuLoad',
        parameters: [],
        returnValue: 'double'
      },
    }, {
      responseType: 'json'
    }).toPromise().then(value => {
      return JSON.parse(value)
    }, err => console.log(err))
    return out
  }

  getStatusStream(): Observable<any> {
    return Observable.create(observer => {
      const eventSource = this.getEventSource(this.remoteControlURL + 'getstatusstream')
      eventSource.onmessage = event => {
        this.ngZone.run(() => {
          observer.next(event)
        })
      }
      eventSource.onerror = error => {
        this.ngZone.run(() => {
          observer.error(error)
        })
      }
    })
  }

  public setEventStream(name: string) {
    this.http.put<any>(this.remoteControlURL + 'setstatusstreamcontent', {
      cmname: name,
      requiredFunctionalities: [
        {
          functionalityType: 'Runtime',
          method: 'public long org.sociotech.cmf3.remote.functionality.RuntimeFunctionality.getMemoryUsed()',
          methodName: 'getMemoryUsed',
          parameters: [],
          returnValue: 'long'
        }
      ]
    }, {responseType: 'json'}
    ).toPromise().then(value1 => {
      console.log(value1)
    })
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url)
  }
}
