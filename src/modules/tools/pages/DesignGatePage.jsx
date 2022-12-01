import makerjs from 'makerjs'
import parse from 'html-react-parser'

export const DesignGatePage = () => {
    let model3 = {
        models: {
            rect1: makerjs.model.move(new makerjs.models.Rectangle(50, 100), [0, 0]),
            ring1: makerjs.model.move(new Polygon(3, 50, 0, 0), [0, 0]),
            bc1: makerjs.model.move(new makerjs.models.BoltCircle(90, 4, 10), [0, 0]),
            bc2: makerjs.model.move(new makerjs.models.BoltCircle(55, 7, 6, 30), [0, 0])
        }
    }

    const modelSvg = makerjs.exporter.toSVG(model3)

    return (
        <div className='p-3'>{parse(modelSvg)}</div>
    )
}

function Polygon(number_of_sides, radius, offset_angle, radius_on_flats) {
    this.models = {
        example: new makerjs.models.Polygon(
            number_of_sides,
            radius,
            offset_angle,
            radius_on_flats
        )
    };
}