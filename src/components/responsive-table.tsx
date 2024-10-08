import { useState, useEffect } from "react"
import getArticulos from "@/stores/articulosStore"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent,DropdownMenuItem, DropdownMenuLabel,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"


export function ResponsiveTable() {
  const { articles, total, isLoading, error, fetchArticles } = getArticulos()
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual

  // Llama a la función fetchArticles para obtener los artículos al montar el componente o cuando cambie la página
  useEffect(() => {
    fetchArticles(currentPage); // Llamada a la función con la página actual
  }, [fetchArticles, currentPage]); // Se actualiza cada vez que cambia la página

  // Filtrar los artículos según el término de búsqueda
  const filteredArticles = articles.filter((article) =>
    Object.values(article).some((value) =>
      value !== null &&
      value
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  // Calcular el total de páginas
  const totalPages = Math.ceil(total / 12); // 12 artículos por página

  // // Mostrar un mensaje de carga o error si corresponde
  // if (isLoading) return <p className="text-center">Cargando artículos...</p>;
  // if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-nowrap mb-10">Artículos Inventario</h1>
      {/* <p className="text-lg font-semibold mt-3 mb-3 ">Total de artículos: {total}</p> */}
      <div className="flex justify-between mb-10">
        <Input
          placeholder="Buscar artículos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[900px] h-[45px] "
        />
        <Button className="bg-slate-900 h-[45px] transition-all  duration-300 hover:scale-105 text-white">Agregar Artículo</Button>
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <Table className="min-w-full shadow-md">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>SAP</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Código Interno</TableHead>
              <TableHead>Unidad de Medida</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-bold">{article.id}</TableCell>
                <TableCell>{article.nombre}</TableCell>
                <TableCell>{article.sap}</TableCell>
                <TableCell>{article.sku}</TableCell>
                <TableCell>{article.codigo_interno}</TableCell>
                <TableCell>{article.unidad_medida}</TableCell>
                <TableCell>${article.precio}</TableCell>
                <TableCell className="">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
      <Button
          className="bg-slate-900 transition-all  duration-300 hover:scale-105 text-white"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Anterior
        </Button>
        <span className="font-bold  text-lg">Página {currentPage} de {totalPages}</span>
        <Button
          className="bg-slate-900 transition-all  duration-300 hover:scale-105 text-white"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}