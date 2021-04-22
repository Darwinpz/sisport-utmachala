
import React, { useEffect, useState } from "react";

import semestreService from 'services/semestres'

export default function VERsemestres() {


    const [data, setData] = useState("")

    const jwt = localStorage.getItem("jwt")

    const { all } = semestreService({ jwt })


    useEffect(() => {

        all({})
            .then(sem => {

                setData(sem)

                const script = document.createElement('script');

                script.src = "/js/table.js";
                script.async = true;

                document.body.appendChild(script);

            })
            .catch(() => {

            })


    }, [jwt, setData])

    return (

        <>
            {data &&
                <div className="table-responsive " style={{ marginTop: "auto" }}>
                    <table id="table_semestres" width="100%" cellSpacing="0" className="table table-hover ">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Paralelo</th>
                                <th scope="col">Carrera</th>
                                <th scope="col">Facultad</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tfoot>
                        </tfoot>
                        <tbody>
                            {
                                data.map(({ sem_codigo, sem_nombre, sem_paralelo, car_nombre, fac_nombre }) =>

                                    <tr key={sem_codigo}>
                                        <td>{sem_nombre}</td>
                                        <td>{sem_paralelo}</td>
                                        <td>{car_nombre}</td>
                                        <td>{fac_nombre}</td>
                                        <td ><a type="button" href={`/semestres/editar/${sem_codigo}`} className="btn btn-primary mr-2 mb-2"><i className="fas fa-eye"></i></a>
                                        <a type="button" href={`/semestres/eliminar/${sem_codigo}`} className="btn btn-danger mb-2"><i className="fas fa-trash"></i></a></td>

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