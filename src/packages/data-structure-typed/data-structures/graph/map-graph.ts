import {MapGraphCoordinate, VertexId} from '../../types';
import {DirectedEdge, DirectedGraph, DirectedVertex} from './directed-graph';

export class MapVertex<T = any> extends DirectedVertex<T> {
    /**
     * The constructor function initializes an object with an id, latitude, longitude, and an optional value.
     * @param {VertexId} id - The `id` parameter is of type `VertexId` and represents the identifier of the vertex.
     * @param {number} lat - The "lat" parameter represents the latitude of a vertex. Latitude is a geographic coordinate
     * that specifies the north-south position of a point on the Earth's surface. It is measured in degrees, with positive
     * values representing points north of the equator and negative values representing points south of the equator.
     * @param {number} long - The "long" parameter represents the longitude of a location. Longitude is a geographic
     * coordinate that specifies the east-west position of a point on the Earth's surface. It is measured in degrees, with
     * values ranging from -180 to 180.
     * @param {T} [val] - The "val" parameter is an optional value of type T. It is not required to be provided when
     * creating an instance of the class.
     */
    constructor(id: VertexId, lat: number, long: number, val?: T) {
        super(id, val);
        this._lat = lat;
        this._long = long;
    }

    private _lat: number;

    get lat(): number {
        return this._lat;
    }

    set lat(value: number) {
        this._lat = value;
    }

    private _long: number;

    get long(): number {
        return this._long;
    }

    set long(value: number) {
        this._long = value;
    }
}

export class MapEdge<T = any> extends DirectedEdge<T> {
    /**
     * The constructor function initializes a new instance of a class with the given source, destination, weight, and
     * value.
     * @param {VertexId} src - The `src` parameter is the source vertex ID. It represents the starting point of an edge in
     * a graph.
     * @param {VertexId} dest - The `dest` parameter is the identifier of the destination vertex for an edge.
     * @param {number} [weight] - The weight parameter is an optional number that represents the weight of the edge.
     * @param {T} [val] - The "val" parameter is an optional parameter of type T. It is used to store additional
     * information or data associated with the edge.
     */
    constructor(src: VertexId, dest: VertexId, weight?: number, val?: T) {
        super(src, dest, weight, val);
    }
}


export class MapGraph<V extends MapVertex<V['val']> = MapVertex, E extends MapEdge = MapEdge> extends DirectedGraph<V, E> {

    /**
     * The constructor function initializes the origin and bottomRight properties of a MapGraphCoordinate object.
     * @param {MapGraphCoordinate} origin - The `origin` parameter is a `MapGraphCoordinate` object that represents the
     * starting point or reference point of the map graph. It defines the coordinates of the top-left corner of the map
     * graph.
     * @param {MapGraphCoordinate} [bottomRight] - The `bottomRight` parameter is an optional parameter of type
     * `MapGraphCoordinate`. It represents the bottom right coordinate of a map graph. If this parameter is not provided,
     * it will default to `undefined`.
     */
    constructor(origin: MapGraphCoordinate, bottomRight?: MapGraphCoordinate) {
        super();
        this._origin = origin;
        this._bottomRight = bottomRight;
    }

    private _origin: MapGraphCoordinate = [0, 0];

    get origin(): MapGraphCoordinate {
        return this._origin;
    }

    set origin(value: MapGraphCoordinate) {
        this._origin = value;
    }

    private _bottomRight: MapGraphCoordinate | undefined;

    get bottomRight(): MapGraphCoordinate | undefined {
        return this._bottomRight;
    }

    set bottomRight(value: MapGraphCoordinate | undefined) {
        this._bottomRight = value;
    }

    /**
     * The function creates a new vertex with the given id, value, latitude, and longitude.
     * @param {VertexId} id - The id parameter is the unique identifier for the vertex. It is of type VertexId, which could
     * be a string or a number depending on how you define it in your code.
     * @param [val] - The `val` parameter is an optional value that can be assigned to the `val` property of the vertex. It
     * is of type `V['val']`, which means it should be of the same type as the `val` property of the vertex class `V`.
     * @param {number} lat - The `lat` parameter represents the latitude of the vertex. It is a number that specifies the
     * position of the vertex on the Earth's surface in the north-south direction.
     * @param {number} long - The `long` parameter represents the longitude coordinate of the vertex.
     * @returns The method is returning a new instance of the `MapVertex` class, casted as type `V`.
     */
    override createVertex(id: VertexId, val?: V['val'], lat: number = this.origin[0], long: number = this.origin[1]): V {
        return new MapVertex(id, lat, long, val) as V;
    }

    /**
     * The function creates a new instance of a MapEdge with the given source, destination, weight, and value.
     * @param {VertexId} src - The source vertex ID of the edge. It represents the starting point of the edge.
     * @param {VertexId} dest - The `dest` parameter is the identifier of the destination vertex for the edge being
     * created.
     * @param {number} [weight] - The `weight` parameter is an optional number that represents the weight of the edge. It
     * is used to assign a numerical value to the edge, which can be used in algorithms such as shortest path algorithms.
     * If the weight is not provided, it can be set to a default value or left undefined.
     * @param [val] - The `val` parameter is an optional value that can be assigned to the edge. It can be of any type,
     * depending on the specific implementation of the `MapEdge` class.
     * @returns a new instance of the `MapEdge` class, casted as type `E`.
     */
    override createEdge(src: VertexId, dest: VertexId, weight?: number, val?: E['val']): E {
        return new MapEdge(src, dest, weight, val) as E;
    }
}