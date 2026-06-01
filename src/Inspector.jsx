
import { InspectorComponent, ColorPickerComponent, EdgeTypePickerComponent } from "@visuallyjs/browser-ui-react"
import { Node, Group, Edge } from "@visuallyjs/browser-ui"
import {
    POOL,
    LANE,
    TASK,
    GATEWAY,
    GATEWAY_TYPES,
    TASK_TYPES,
    MARKER_TYPES,
    EVENT_TYPES,
    INTERMEDIATE_EVENT, INTERMEDIATE_EVENT_TYPES,
    START_EVENT_TYPES, END_EVENT_TYPES, END_EVENT, START_EVENT
} from "@visuallyjs/bpmn";

function capitalise(id) {
    return id[0].toUpperCase() + id.substring(1)
}

function markerName(id) {
    return capitalise(id.split("-")[0])
}

function eventName(id) {
    return id.split("-").map(capitalise).join(" ")
}

function GatewayInspector({currentObj}) {

    return <><div className="vjs-inspector-section">
        <h4>Label</h4>
        <input type="text" vjs-att="label" vjs-focus="true" placeholder="Label"/>
    </div>
    <div className="vjs-inspector-section">
        <h3>Color</h3>
            <div>Fill</div>
            <ColorPickerComponent propertyName="fill" maxColors={3}/>
    </div>
    <div className="vjs-inspector-section">
        <h3>Type</h3>
        {GATEWAY_TYPES.map(t => <label style={{display:"flex", alignItems:"center"}} key={t}>
            <vjs-bpmn-icon icon-id={t} width={20} height={20}/>
            <input type="radio" vjs-att="gatewayType" value={t} name="gatewayType" />
            <span>{capitalise(t)}</span>
        </label>)}
    </div>
    </>
}

function EventInspector({obj}) {

    return <><div className="vjs-inspector-section">
        <h3>Color</h3>
        <div>Fill</div>
        <ColorPickerComponent propertyName="fill" maxColors={3}/>
        <div>Outline</div>
        <ColorPickerComponent propertyName="outline" maxColors={3}/>
    </div>
    <div className="vjs-inspector-section">
        <h3>Type</h3>
        {obj.data.type === INTERMEDIATE_EVENT && <>
        {INTERMEDIATE_EVENT_TYPES.map(t => <label style={{display:"flex", alignItems:"center"}} key={t}>
            <vjs-bpmn-icon icon-id={t} width={20} height={20}/>
            <input type="radio" vjs-att="eventType" name="eventType" value={t} />
            <span>{eventName(t)}</span>
        </label>)}
        </>}

        {obj.data.type === START_EVENT && <>
            {START_EVENT_TYPES.map(t => <label style={{display:"flex", alignItems:"center"}} key={t}>
                <vjs-bpmn-icon icon-id={t} width={20} height={20}/>
                <input type="radio" vjs-att="eventType" name="eventType" value={t} />
                <span>{eventName(t)}</span>
            </label>)}
        </>}

        {obj.data.type === END_EVENT && <>
            {END_EVENT_TYPES.map(t => <label style={{display:"flex", alignItems:"center"}} key={t}>
                <vjs-bpmn-icon icon-id={t} width={20} height={20}/>
                <input type="radio" vjs-att="eventType" name="eventType" value={t} />
                <span>{eventName(t)}</span>
            </label>)}
        </>}
    </div>
    </>
}

function TaskInspector({currentObj}) {
    return <><div className="vjs-inspector-section">
        <h4>Label</h4>
        <input type="text" vjs-att="label" vjs-focus="true" placeholder="Label"/>
    </div>

    <div className="vjs-inspector-section">
        <h3>Color</h3>
        <div>Fill</div>
        <ColorPickerComponent propertyName="fill" maxColors={3}/>
        <div>Outline</div>
        <ColorPickerComponent propertyName="outline" maxColors={3}/>
        <div>Text</div>
        <ColorPickerComponent propertyName="color" maxColors={3}/>
    </div>

        <div className="vjs-inspector-section">
            <h4>Task Type</h4>
            {TASK_TYPES.map(t => <label style={{display:"flex", alignItems:"center"}} key={t}>
                    <vjs-bpmn-icon icon-id={t} width={20} height={20}/>
                    <input type="radio" vjs-att="taskType" value={t} name="taskType" />
                    <span>{capitalise(t)}</span>
                </label>)}
        </div>
        <div className="vjs-inspector-section">
            <h4>Markers</h4>
            {MARKER_TYPES.map(t => <label style={{display:"flex", alignItems:"center"}} key={t}>
                <vjs-bpmn-icon icon-id={t} width={20} height={20}/>
                    <input type="checkbox" vjs-att="markers" value={t} />
                    <span>{markerName(t)}</span>
                </label>)}
        </div>

    </>
}

export default function BpmnInspector() {
    //
    // const [currentObj, setCurrentObj] = useState(null);
    // const [currentObjectType, setCurrentObjectType] = useState('')
    // const [currentType, setCurrentType] = useState('')
    //
    // const renderEmptyContainer = () => {
    //     setCurrentObjectType('')
    //     setCurrentType('')
    // }
    //
    // const refresh = (obj) => {
    //     setCurrentObj(obj)
    //     setCurrentObjectType(obj.objectType)
    //     setCurrentType(obj.type)
    // }

    // const isGroup = currentObjectType === Group.objectType;
    // const isPoolOrLane = isGroup && (currentType === POOL || currentType === LANE);
    // const isTask = currentObjectType === Node.objectType && currentType === TASK;
    // const isGateway = currentObjectType === Node.objectType && currentType === GATEWAY
    // const isEvent = currentObjectType === Node.objectType && EVENT_TYPES.includes(currentType)

    const isGroup = (obj) => obj.objectType === Group.objectType;
    const isPoolOrLane =  (obj) => isGroup(obj) && (obj.type === POOL || obj.type === LANE);
    const isTask = (obj) => obj.objectType === Node.objectType && obj.type === TASK;
    const isGateway = (obj) => obj.objectType === Node.objectType && obj.type === GATEWAY
    const isEvent = (obj)  => obj.objectType === Node.objectType && EVENT_TYPES.includes(obj.type)

    return <InspectorComponent className="vjs-bpmn-inspector">

        {(current) => <>

        {current != null && <>
            { isPoolOrLane(current) && <>
                <div className="vjs-inspector-section">
                    <div>Title</div>
                    <input type="text" vjs-att="title" vjs-focus="true" placeholder="Title"/>
                </div>


                <div className="vjs-inspector-section">
                    <h4>Header</h4>
                    <div>Fill</div>
                    <ColorPickerComponent propertyName="headerFill"/>
                    <div>Text color</div>
                    <ColorPickerComponent propertyName="headerColor"/>
                </div>

                <div className="vjs-inspector-section">
                    <h4>Body</h4>
                    <div>Fill</div>
                    <ColorPickerComponent propertyName="fill"/>
                    <div>Outline</div>
                    <ColorPickerComponent propertyName="outline"/>
                </div>
            </>
            }

            { isTask(current) && <TaskInspector obj={current}/> }

            { isGateway(current) &&  <GatewayInspector obj={current}/> }

            { isEvent(current) &&  <EventInspector obj={current}/> }

            {current?.objectType === Edge.objectType && <>
                <div className="vjs-inspector-section">
                    <div>Label</div>
                    <input type="text" vjs-att="label"/>
                </div>
                <div className="vjs-inspector-section">
                    <div>Line style</div>
                    <EdgeTypePickerComponent propertyName="type"/>
                </div>
            </>}

        </>}

        </>}

    </InspectorComponent>
}
