import React, { useState } from "react";
import { FormatDate } from "@/utils/FormatDate";
import { MessageSquare } from "lucide-react";
import { useFetchCommentsByTicket } from "../Hooks/useFetchCommentsByTicket";
import Button from "@/components/common/Ui/Button";
import ModalDefault from "@/components/common/Ui/ModalDefault";

interface ModalCommentsTicketProps {
  idTicket: number;
}

const ModalCommetsTicket: React.FC<ModalCommentsTicketProps> = ({
  idTicket,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const { dataComments, loadingComments, errorComments } =
  //   useFetchComments(isModalOpen);

  const { dataComments, errorComments, fetchComments } =
    useFetchCommentsByTicket();

  // if(loadingComments) return <LoadingSpinner/>
  if (errorComments) return <p className="text-red-600">{errorComments}</p>;

  return (
    <>
      <Button
        variant="any"
        onClick={() => {
          setIsModalOpen(true);
          fetchComments(idTicket);
        }}
        title="Comentarios"
        icon={<MessageSquare className="w-4 h-4" />}
        className="p-2 mr-4 duration-300 ease-in-out bg-gray-200 rounded-full hover:text-white hover:bg-gray-700 dark:text-white focus:outline-none dark:hover:opacity-80 dark:bg-gray-500"
      />
      {/* Modal */}
      
        <ModalDefault
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Comentarios del Ticket"
          size="md"
          footerVariant="default" 
        >
            <div className="max-h-[78vh] overflow-auto flex justify-center px-5 py-6">
              <table className="min-w-[50%] text-sm mb-4">
                <thead className="">
                  <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-300 ">
                    <th className="">Comentario</th>
                    <th className="">Nombre</th>
                    <th className="">Apellido</th>
                    <th className="">Fecha Creacion</th>
                  </tr>
                </thead>
                <tbody className="text-center dark:text-gray-200">
                  {dataComments.map((c) => (
                    <tr key={c.id}>
                      <td>{c.comment}</td>
                      <td>{c.responsable}</td>
                      <td>{c.lastName}</td>
                      <td>{FormatDate(c.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </ModalDefault>
    </>
  );
};

export default ModalCommetsTicket;
