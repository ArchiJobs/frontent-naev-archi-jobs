export interface Job {
  id: number;
  empresaId: number;
  categoriaId: number;
  ubicacionId: number;
  titulo: string;
  descripcion: string;
  modalidad: string;
  tipoContrato: string;
  salarioMin: number;
  salarioMax: number;
  fechaPublicacion: Date | null;
  activo: boolean;
}
