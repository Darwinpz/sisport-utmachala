
import React, { useEffect } from "react";

import { Link } from 'wouter'
import useScript from 'hooks/useScript'
import { useLocation } from "wouter"
import useUser from 'hooks/useUser'
import usePerfil from 'hooks/usePerfil'
import usePortafolio from "hooks/usePortafolio"
import Upload from "components/Modals/upload"
import Diario from "components/Modals/diario"
import Archivos from "components/Modals/archivos"
import Expectativas from "components/Modals/expectativas"
import Informe from "components/Modals/informe"

import './index.css'

export default function VerPortafolio({ asig_codigo, peri_codigo, per_codigo }) {

    const { isLogged } = useUser()

    const { perfil } = usePerfil()

    const { portafolio } = usePortafolio({ asig_codigo, peri_codigo, per_codigo })

    const [, navigate] = useLocation()

    useEffect(() => {
        if (!isLogged) {
            navigate("/login")
        }

    }, [isLogged, navigate])

    useScript("/js/file-explore.js")
    useScript("/js/modals.js")


    return (

        <>
            { isLogged &&
                <div className="card border-secondary">
                    <div className="card-header text-center">

                        {
                            portafolio.map(({ estructura, estudiante }) =>

                                <h4 key={estructura.cod_asignatura}>PORTAFOLIO DE {estructura.nombre_asignatura}:
                                    {
                                        perfil.per_tipo !== "ESTUDIANTE" &&

                                        <>
                                            {" " + estudiante.per_nombre + " " + estudiante.per_apellido}
                                            <p style={{ display: "none" }} id="est_cedula">{estudiante.per_cedula}</p>
                                        </>

                                    }
                                </h4>

                            )



                        }
                    </div>

                    <div className="card-body">

                        <div className="row">

                            <div className="col">

                                <div className="card border-secondary">

                                    <div className="card-body">

                                        <ul className="file-tree">
                                            <li>
                                                {

                                                    portafolio.map(({ estructura }) =>

                                                        <div key={estructura.cod_asignatura} >
                                                            <Link to="#" to="#" id="asignatura_nombre">{estructura.nombre_asignatura}</Link>

                                                            <p style={{ display: "none" }} id="asig_codigo">{estructura.cod_asignatura}</p>
                                                            <p style={{ display: "none" }} id="peri_codigo">{estructura.periodo}</p>

                                                            <p style={{ display: "none" }} id="identificador">{estructura.identificador}</p>
                                                            <p style={{ display: "none" }} id="per_cedula">{perfil.per_cedula}</p>
                                                            <p style={{ display: "none" }} id="per_tipo">{perfil.per_tipo}</p>

                                                        </div>
                                                    )


                                                }
                                                {
                                                    portafolio.map(({ portafolio_data }) =>
                                                        <p key="est_codigo" style={{ display: "none" }} id="est_codigo">{portafolio_data.datos_informativos.cod_estudiante}</p>

                                                    )
                                                }

                                                {
                                                    portafolio.map(({ nombre_esquema }) =>
                                                        <p style={{ display: "none" }} key={nombre_esquema} id="esquema">{nombre_esquema}</p>
                                                    )
                                                }

                                                <ul>
                                                    <li><Link to="#" >1. Datos Informativos</Link>
                                                        <ul>
                                                            <li><Link to="#" data-toggle="modal"
                                                                data-target="#popupconfirmar">Carta de Compromiso</Link></li>
                                                        </ul>
                                                    </li>

                                                    <li><Link to="#" >2. Elementos curriculares</Link>
                                                        <ul>

                                                            <li><Link to="#" >a) Syllabus</Link>
                                                                <ul>

                                                                    {

                                                                        portafolio.map(({ portafolio_data }) =>
                                                                            <div key={portafolio_data.datos_informativos.cod_estudiante}>
                                                                                {
                                                                                    portafolio_data.elementos_curriculares.syllabus.nombre_archivo &&
                                                                                    <li key="asistencia"><a style={{ cursor: "pointer" }} href="/" data-toggle="modal" data-target="#archivo" data-tipo="syllabus" data-titulo="SYLLABUS ACADÉMICO" data-nombre={portafolio_data.elementos_curriculares.syllabus.nombre_archivo}>{portafolio_data.elementos_curriculares.syllabus.nombre_archivo}</a></li>

                                                                                }

                                                                            </div>
                                                                        )

                                                                    }

                                                                    {
                                                                        perfil.per_tipo === "ESTUDIANTE" &&
                                                                        <li className="subida"><a style={{ cursor: "pointer" }} href="/" data-toggle="modal"
                                                                            data-target="#subir" data-tipo="syllabus" data-titulo="SYLLABUS" data-cant="1" data-size="2" data-type=".pdf, .doc, .docx">Subir</a></li>

                                                                    }

                                                                </ul>
                                                            </li>

                                                            <li><Link to="#" >b) Expectativas del curso</Link>
                                                                <ul>
                                                                    <li><a style={{ cursor: "pointer" }} href="/" data-toggle="modal"
                                                                        data-target="#expectativas">Expectativas</a></li>
                                                                </ul>
                                                            </li>

                                                            <li><Link to="#" >c) Apuntes de clase</Link>
                                                                <ul>
                                                                    {

                                                                        portafolio.map(({ portafolio_data }) =>
                                                                            <div key={portafolio_data.datos_informativos.cod_estudiante}>
                                                                                {
                                                                                    portafolio_data.elementos_curriculares.apuntes.map(({ num_diario, tiempo, fecha, periodo_inicio, periodo_fin }) =>

                                                                                        <li key={num_diario}><a style={{ cursor: "pointer" }} href="/" data-toggle="modal" data-numero={num_diario}
                                                                                            data-horas={tiempo} data-fecha={fecha} data-inicio={periodo_inicio} data-fin={periodo_fin}

                                                                                            data-target="#diario">Diario Metacognitivo {num_diario}</a>
                                                                                        </li>
                                                                                    )
                                                                                }


                                                                            </div>
                                                                        )

                                                                    }
                                                                </ul>
                                                            </li>

                                                            <li><Link to="#" id="evaluaciones" >d) Evaluaciones</Link>
                                                                <ul>

                                                                    {

                                                                        portafolio.map(({ portafolio_data }) =>

                                                                            <div key={portafolio_data.datos_informativos.cod_estudiante}>
                                                                                {
                                                                                    portafolio_data.elementos_curriculares.evaluaciones.map(({ nombre_archivo }) =>

                                                                                        <li key={nombre_archivo}><a style={{ cursor: "pointer" }} href="/" data-toggle="modal" data-tipo="evaluaciones" data-titulo="EVALUACIÓN" data-nombre={nombre_archivo}
                                                                                            data-target="#archivo">{nombre_archivo}</a></li>
                                                                                    )
                                                                                }

                                                                            </div>
                                                                        )

                                                                    }
                                                                    {
                                                                        perfil.per_tipo === "ESTUDIANTE" &&

                                                                        <li className="subida"><a style={{ cursor: "pointer" }} href="/" data-toggle="modal"
                                                                            data-target="#subir" data-tipo="evaluaciones" data-titulo="EVALUACIONES" data-cant="3" data-size="2" data-type=".pdf, .doc, .docx, .xls, .xlsx, .zip, .rar">Subir</a></li>

                                                                    }


                                                                </ul>
                                                            </li>

                                                            <li><Link to="#" >e) Investigaciones</Link>
                                                                <ul>

                                                                    {

                                                                        portafolio.map(({ portafolio_data }) =>
                                                                            <div key={portafolio_data.datos_informativos.cod_estudiante}>
                                                                                {
                                                                                    portafolio_data.elementos_curriculares.investigaciones.map(({ nombre_archivo }) =>

                                                                                        <li key={nombre_archivo}><a style={{ cursor: "pointer" }} href="/" data-toggle="modal" data-tipo="investigaciones" data-titulo="INVESTIGACION" data-nombre={nombre_archivo}
                                                                                            data-target="#archivo">{nombre_archivo}</a></li>
                                                                                    )
                                                                                }

                                                                            </div>
                                                                        )

                                                                    }

                                                                    {
                                                                        perfil.per_tipo === "ESTUDIANTE" &&
                                                                        <li className="subida"><a style={{ cursor: "pointer" }} href="/" data-toggle="modal"
                                                                            data-target="#subir" data-tipo="investigaciones" data-titulo="INVESTIGACIONES" data-cant="5" data-size="3" data-type=".pdf, .doc, .docx, .zip, .rar">Subir</a></li>

                                                                    }

                                                                </ul>
                                                            </li>

                                                            <li><Link to="#" >f) Actividades de experimentación</Link>
                                                                <ul>
                                                                    {

                                                                        portafolio.map(({ portafolio_data }) =>
                                                                            <div key={portafolio_data.datos_informativos.cod_estudiante}>
                                                                                {
                                                                                    portafolio_data.elementos_curriculares.actividades.map(({ nombre_archivo }) =>

                                                                                        <li key={nombre_archivo}><a style={{ cursor: "pointer" }} href="/" data-toggle="modal" data-tipo="actividades" data-titulo="ACTIVIDAD DE EXPERIMENTACIÓN" data-nombre={nombre_archivo}
                                                                                            data-target="#archivo">{nombre_archivo}</a></li>
                                                                                    )
                                                                                }

                                                                            </div>
                                                                        )

                                                                    }
                                                                    {
                                                                        perfil.per_tipo === "ESTUDIANTE" &&
                                                                        <li className="subida"><a style={{ cursor: "pointer" }} href="/" data-toggle="modal"
                                                                            data-target="#subir" data-tipo="actividades" data-titulo="ACTIVIDADES DE EXPERIMENTACIÓN" data-cant="5" data-size="3" data-parametro="archivos" data-type=".pdf, .doc, .docx, .zip, .rar">Subir</a></li>

                                                                    }

                                                                </ul>
                                                            </li>

                                                            <li><Link to="#" >g) Proyectos</Link>
                                                                <ul>

                                                                    {

                                                                        portafolio.map(({ portafolio_data }) =>
                                                                            <div key={portafolio_data.datos_informativos.cod_estudiante}>
                                                                                {
                                                                                    portafolio_data.elementos_curriculares.proyectos.map(({ nombre_archivo }) =>

                                                                                        <li key={nombre_archivo}><a style={{ cursor: "pointer" }} href="/" data-toggle="modal" data-tipo="proyectos" data-titulo="PROYECTO" data-nombre={nombre_archivo}
                                                                                            data-target="#archivo">{nombre_archivo}</a></li>
                                                                                    )
                                                                                }

                                                                            </div>
                                                                        )

                                                                    }

                                                                    {
                                                                        perfil.per_tipo === "ESTUDIANTE" &&
                                                                        <li className="subida"><a style={{ cursor: "pointer" }} href="/" data-toggle="modal"
                                                                            data-target="#subir" data-tipo="proyectos" data-titulo="PROYECTOS" data-cant="3" data-size="3" data-parametro="archivos" data-type=".pdf, .doc, .docx, .zip, .rar">Subir</a></li>

                                                                    }

                                                                </ul>
                                                            </li>

                                                            <li><Link to="#" >h) Estudios de caso</Link>
                                                                <ul>

                                                                    {

                                                                        portafolio.map(({ portafolio_data }) =>
                                                                            <div key={portafolio_data.datos_informativos.cod_estudiante}>
                                                                                {
                                                                                    portafolio_data.elementos_curriculares.casos_estudio.map(({ nombre_archivo }) =>

                                                                                        <li key={nombre_archivo}><a style={{ cursor: "pointer" }} href="/" data-toggle="modal" data-tipo="casos_estudio" data-titulo="ESTUDIOS DE CASO" data-nombre={nombre_archivo}
                                                                                            data-target="#archivo">{nombre_archivo}</a></li>
                                                                                    )
                                                                                }

                                                                            </div>
                                                                        )

                                                                    }

                                                                    {
                                                                        perfil.per_tipo === "ESTUDIANTE" &&
                                                                        <li className="subida"><a style={{ cursor: "pointer" }} href="/" data-toggle="modal"
                                                                            data-target="#subir" data-tipo="casos_estudio" data-titulo="ESTUDIOS DE CASO" data-cant="3" data-size="2" data-parametro="archivos" data-type=".pdf, .doc, .docx, .zip, .rar">Subir</a></li>

                                                                    }

                                                                </ul>
                                                            </li>

                                                            <li><Link to="#" >i) Planteamiento de problemas</Link>
                                                                <ul>
                                                                    {

                                                                        portafolio.map(({ portafolio_data }) =>
                                                                            <div key={portafolio_data.datos_informativos.cod_estudiante}>
                                                                                {
                                                                                    portafolio_data.elementos_curriculares.planteamientos.map(({ nombre_archivo }) =>

                                                                                        <li key={nombre_archivo}><a style={{ cursor: "pointer" }} href="/" data-toggle="modal" data-tipo="planteamientos" data-titulo="PLANTEAMIENTO DE PROBLEMAS" data-nombre={nombre_archivo}
                                                                                            data-target="#archivo">{nombre_archivo}</a></li>
                                                                                    )
                                                                                }

                                                                            </div>
                                                                        )

                                                                    }
                                                                    {
                                                                        perfil.per_tipo === "ESTUDIANTE" &&
                                                                        <li className="subida"><a style={{ cursor: "pointer" }} href="/" data-toggle="modal"
                                                                            data-target="#subir" data-tipo="planteamientos" data-titulo="PLANTEAMIENTO DE PROBLEMAS" data-cant="3" data-size="2" data-parametro="archivos" data-type=".pdf, .doc, .docx, .zip, .rar">Subir</a></li>

                                                                    }


                                                                </ul>
                                                            </li>

                                                            <li><Link to="#" >j) Registro de asistencia</Link>
                                                                <ul>
                                                                    {

                                                                        portafolio.map(({ portafolio_data }) =>
                                                                            <div key={portafolio_data.datos_informativos.cod_estudiante}>
                                                                                {
                                                                                    portafolio_data.elementos_curriculares.asistencia.nombre_archivo &&
                                                                                    <li key="asistencia"><a style={{ cursor: "pointer" }} href="/" data-toggle="modal" data-target="#archivo" data-tipo="asistencia" data-titulo="REGISTRO DE ASISTENCIA" data-nombre={portafolio_data.elementos_curriculares.asistencia.nombre_archivo}>{portafolio_data.elementos_curriculares.asistencia.nombre_archivo}</a></li>

                                                                                }

                                                                            </div>
                                                                        )

                                                                    }

                                                                    {
                                                                        perfil.per_tipo === "ESTUDIANTE" &&

                                                                        <li className="subida"><a style={{ cursor: "pointer" }} href="/" data-toggle="modal"
                                                                            data-target="#subir" data-tipo="asistencia" data-titulo="REGISTRO DE ASISTENCIA" data-cant="1" data-size="2" data-parametro="archivos" data-type=".pdf, .doc, .docx">Subir</a></li>


                                                                    }


                                                                </ul>
                                                            </li>

                                                            <li><Link to="#" >k) Registro de observaciones</Link>
                                                                <ul>

                                                                    {

                                                                        portafolio.map(({ portafolio_data }) =>
                                                                            <div key={portafolio_data.datos_informativos.cod_estudiante}>
                                                                                {
                                                                                    portafolio_data.elementos_curriculares.observaciones.map(({ nombre_archivo }) =>

                                                                                        <li key={nombre_archivo}><a style={{ cursor: "pointer" }} href="/" data-toggle="modal" data-tipo="observaciones" data-titulo="REGISTRO DE OBSERVACIÓN" data-nombre={nombre_archivo}
                                                                                            data-target="#archivo">{nombre_archivo}</a></li>
                                                                                    )
                                                                                }

                                                                            </div>
                                                                        )

                                                                    }

                                                                    {
                                                                        perfil.per_tipo === "ESTUDIANTE" &&

                                                                        <li className="subida"><a style={{ cursor: "pointer" }} href="/" data-toggle="modal"
                                                                            data-target="#subir" data-tipo="observaciones" data-titulo="REGISTRO DE OBSERVACIONES" data-cant="3" data-size="2" data-parametro="archivos" data-type=".pdf, .doc, .docx, .zip, .rar">Subir</a></li>


                                                                    }

                                                                </ul>
                                                            </li>

                                                            <li><Link to="#" >l) Tareas intraclases</Link>
                                                                <ul>

                                                                    {

                                                                        portafolio.map(({ portafolio_data }) =>
                                                                            <div key={portafolio_data.datos_informativos.cod_estudiante}>
                                                                                {
                                                                                    portafolio_data.elementos_curriculares.intraclases.map(({ nombre_archivo }) =>

                                                                                        <li key={nombre_archivo}><a style={{ cursor: "pointer" }} href="/" data-toggle="modal" data-tipo="intraclases" data-titulo="TAREA INTRACLASE" data-nombre={nombre_archivo}
                                                                                            data-target="#archivo">{nombre_archivo}</a></li>
                                                                                    )
                                                                                }

                                                                            </div>
                                                                        )

                                                                    }

                                                                    {

                                                                        perfil.per_tipo === "ESTUDIANTE" &&
                                                                        <li className="subida"><a style={{ cursor: "pointer" }} href="/" data-toggle="modal"
                                                                            data-target="#subir" data-tipo="intraclases" data-titulo="TAREAS INTRACLASES" data-cant="5" data-size="3" data-parametro="archivos" data-type=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .zip, .rar">Subir</a></li>


                                                                    }


                                                                </ul>
                                                            </li>

                                                            <li><Link to="#" >m) Tareas autónomas</Link>
                                                                <ul>

                                                                    {

                                                                        portafolio.map(({ portafolio_data }) =>
                                                                            <div key={portafolio_data.datos_informativos.cod_estudiante}>
                                                                                {
                                                                                    portafolio_data.elementos_curriculares.autonomos.map(({ nombre_archivo }) =>

                                                                                        <li key={nombre_archivo}><a style={{ cursor: "pointer" }} href="/" data-toggle="modal" data-tipo="autonomos" data-titulo="TAREA AUTÓNOMA" data-nombre={nombre_archivo}
                                                                                            data-target="#archivo">{nombre_archivo}</a></li>
                                                                                    )
                                                                                }

                                                                            </div>
                                                                        )

                                                                    }

                                                                    {
                                                                        perfil.per_tipo === "ESTUDIANTE" &&
                                                                        <li className="subida"><a style={{ cursor: "pointer" }} href="/" data-toggle="modal"
                                                                            data-target="#subir" data-tipo="autonomos" data-titulo="TAREAS AUTÓNOMAS" data-cant="5" data-size="3" data-parametro="archivos" data-type=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .zip, .rar">Subir</a></li>

                                                                    }

                                                                </ul>
                                                            </li>

                                                            <li><Link to="#" >n) Tareas de refuerzo</Link>
                                                                <ul>
                                                                    {

                                                                        portafolio.map(({ portafolio_data }) =>
                                                                            <div key={portafolio_data.datos_informativos.cod_estudiante}>
                                                                                {
                                                                                    portafolio_data.elementos_curriculares.refuerzo.map(({ nombre_archivo }) =>

                                                                                        <li key={nombre_archivo}><a style={{ cursor: "pointer" }} href="/" data-toggle="modal" data-tipo="refuerzo" data-titulo="TAREA DE REFUERZO" data-nombre={nombre_archivo}
                                                                                            data-target="#archivo">{nombre_archivo}</a></li>
                                                                                    )
                                                                                }

                                                                            </div>
                                                                        )

                                                                    }
                                                                    {
                                                                        perfil.per_tipo === "ESTUDIANTE" &&
                                                                        <li className="subida"><a style={{ cursor: "pointer" }} href="/" data-toggle="modal"
                                                                            data-target="#subir" data-tipo="refuerzo" data-titulo="TAREAS DE REFUERZO" data-cant="3" data-size="3" data-parametro="archivos" data-type=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .zip, .rar">Subir</a></li>

                                                                    }


                                                                </ul>
                                                            </li>

                                                        </ul>
                                                    </li>

                                                    <li id="informe_final"><Link to="#" >3. Informe final</Link>
                                                        <ul>
                                                            <li><a style={{ cursor: "pointer" }} href="/" data-toggle="modal"
                                                                data-target="#informe">Informe</a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>

                                    </div>

                                    <div className="row">

                                        <div className="col">

                                            <button type="button" className="btn btn-success m-2">DESCARGAR PORTAFOLIO</button>
                                            {
                                                perfil.per_tipo === "COORDINADOR" &&
                                                <button type="button" className="btn btn-danger m-2">ELIMINAR PORTAFOLIO</button>

                                            }

                                        </div>


                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            }

            <Upload />

            <Diario />

            <Archivos />

            <Informe />

            <Expectativas />

        </>

    )

}