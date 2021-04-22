
import React, { useEffect, useState } from "react";

import asignaturaService from 'services/asignaturas'

export default function VERasignaturas() {

    const [asignaturas, setAsignaturas] = useState("")

    const jwt = localStorage.getItem("jwt")

    const { all } = asignaturaService({ jwt })

    useEffect(() => {

        all()
            .then(asig => {

                setAsignaturas(asig)

                const script = document.createElement('script');

                script.src = "/js/table.js";
                script.async = true;

                document.body.appendChild(script);

            })
            .catch(() => {

            })

    }, [jwt, setAsignaturas])

    return (

        <>
            {asignaturas &&
                <div className="table-responsive " style={{ marginTop: "auto" }}>
                    <table id="table_estudiantes" width="100%" cellSpacing="0" className="table table-hover ">
                        <thead>
                            <tr>
                                <th scope="col">Identificador</th>
                                <th scope="col">Asignatura</th>
                                <th scope="col">Semestre</th>
                                <th scope="col">Carrera</th>
                                <th scope="col">Facultad</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tfoot>
                        </tfoot>
                        <tbody>
                            {
                                asignaturas.map(({ asig_codigo, asig_identificador, asig_nombre, sem_nombre, car_nombre, fac_nombre }) =>

                                    <tr key={asig_codigo}>
                                        <td>{asig_identificador}</td>
                                        <td>{asig_nombre}</td>
                                        <td>{sem_nombre}</td>
                                        <td>{car_nombre}</td>
                                        <td>{fac_nombre}</td>
                                        <td><a type="button" href={`/asignaturas/editar/${asig_codigo}`} className="btn btn-primary mr-2 mb-2"><i className="fas fa-eye"></i></a>
                                        <a type="button" href={`/asignaturas/eliminar/${asig_codigo}`} className="btn btn-danger mb-2"><i className="fas fa-trash"></i></a></td>

                                    </tr>

                                )
                            }

                        </tbody>
                    </table>
                </div>
            }

        </>

    )

}