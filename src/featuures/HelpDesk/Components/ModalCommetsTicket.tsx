import useAnimation from "@/hooks/useAnimations";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import React, { useState } from "react";
import { FormatDate } from "@/utils/FormatDate";
import { MessageSquare } from "lucide-react";
import { useFetchCommentsByTicket } from "../Hooks/useFetchCommentsByTicket";

interface ModalCommentsTicketProps {
  idTicket: number;
}

const ModalCommetsTicket: React.FC<ModalCommentsTicketProps> = ({idTicket}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useBlockScroll(isModalOpen);

  // const { dataComments, loadingComments, errorComments } =
  //   useFetchComments(isModalOpen);

  const { dataComments, errorComments, fetchComments } =
    useFetchCommentsByTicket();

  const { showAnimation, closing } = useAnimation(isModalOpen, () => {
    setIsModalOpen(false);
  });

  // if(loadingComments) return <LoadingSpinner/>
  if(errorComments) return <p>{errorComments}</p>

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsModalOpen(true)
          fetchComments(idTicket)
        }}
        className="flex items-center justify-center hover:opacity-80 transition-opacity text-white"
        title="Comentarios"
      >
        <MessageSquare className="w-4 h-4" />
      </button>
      {/* Modal */}
      {isModalOpen && (
        <section
          className={`fixed inset-0 z-50 flex items-center justify-center pt-10 pb-10 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section
            className={`w-[90%] max-w-2xl 2xl:max-w-5xl overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-lg dark:bg-gray-800 ${
              isModalOpen && !closing
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Header del modal */}
            <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
              <h1 className="text-2xl font-semibold text-color dark:text-gray-200">
                Solicitar Soporte
              </h1>
              <button
                onClick={() => setIsModalOpen(false)}
                // disabled={!videoCompleted || loading || !success}
                className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
              >
                &times;
              </button>
            </div>

            {/* Contenido del modal */}

            <div className="max-h-[78vh] overflow-auto px-2">
              <table className="min-w-[50%] text-sm mb-4">
                <thead className="">
                  <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-300 ">
                    <th className="">Comentario</th>
                    <th className="">Fecha Creacion</th>
                  </tr>
                </thead>
                <tbody className="text-center dark:text-gray-200">
                  {dataComments.map((c) => (
                    <tr key={c.id}>
                      <td>{c.comment}</td>
                      <td>{FormatDate(c.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default ModalCommetsTicket;
