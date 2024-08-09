export default `
<acontecimientosDeVisita>
    <Visitas>
        <Visita>
            <idVisita>1</idVisita>
            <fechaHora>2024-07-01T10:00:00Z</fechaHora>
            <asesor>Juan Pérez</asesor>
            <verificada>true</verificada>
            <ingresos>5</ingresos>
            <retiros>2</retiros>
            <correccionesDeInventario>1</correccionesDeInventario>
            <revertida>false</revertida>
        </Visita>
        <Visita>
            <idVisita>2</idVisita>
            <fechaHora>2024-07-02T11:30:00Z</fechaHora>
            <asesor>María López</asesor>
            <verificada>true</verificada>
            <ingresos>3</ingresos>
            <retiros>0</retiros>
            <correccionesDeInventario>2</correccionesDeInventario>
            <revertida>false</revertida>
        </Visita>
        <Visita>
            <idVisita>3</idVisita>
            <fechaHora>2024-07-03T14:00:00Z</fechaHora>
            <asesor>Carlos Gómez</asesor>
            <verificada>false</verificada>
            <ingresos>2</ingresos>
            <retiros>3</retiros>
            <correccionesDeInventario>0</correccionesDeInventario>
            <revertida>true</revertida>
        </Visita>
        <Visita>
            <idVisita>4</idVisita>
            <fechaHora>2024-07-04T16:15:00Z</fechaHora>
            <asesor>Luisa Martínez</asesor>
            <verificada>true</verificada>
            <ingresos>0</ingresos>
            <retiros>4</retiros>
            <correccionesDeInventario>1</correccionesDeInventario>
            <revertida>false</revertida>
        </Visita>
        <Visita>
            <idVisita>5</idVisita>
            <fechaHora>2024-07-05T09:45:00Z</fechaHora>
            <asesor>Pedro Fernández</asesor>
            <verificada>false</verificada>
            <ingresos>1</ingresos>
            <retiros>1</retiros>
            <correccionesDeInventario>3</correccionesDeInventario>
            <revertida>true</revertida>
        </Visita>
        <Visita>
            <idVisita>6</idVisita>
            <fechaHora>2024-07-06T12:00:00Z</fechaHora>
            <asesor>Andrea Jiménez</asesor>
            <verificada>true</verificada>
            <ingresos>4</ingresos>
            <retiros>2</retiros>
            <correccionesDeInventario>0</correccionesDeInventario>
            <revertida>false</revertida>
        </Visita>
        <Visita>
            <idVisita>7</idVisita>
            <fechaHora>2024-07-07T13:30:00Z</fechaHora>
            <asesor>Diego Torres</asesor>
            <verificada>true</verificada>
            <ingresos>2</ingresos>
            <retiros>5</retiros>
            <correccionesDeInventario>1</correccionesDeInventario>
            <revertida>true</revertida>
        </Visita>
        <Visita>
            <idVisita>8</idVisita>
            <fechaHora>2024-07-08T15:00:00Z</fechaHora>
            <asesor>Gabriela Sánchez</asesor>
            <verificada>false</verificada>
            <ingresos>3</ingresos>
            <retiros>3</retiros>
            <correccionesDeInventario>2</correccionesDeInventario>
            <revertida>false</revertida>
        </Visita>
        <Visita>
            <idVisita>9</idVisita>
            <fechaHora>2024-07-09T10:15:00Z</fechaHora>
            <asesor>Santiago Rivas</asesor>
            <verificada>true</verificada>
            <ingresos>1</ingresos>
            <retiros>4</retiros>
            <correccionesDeInventario>0</correccionesDeInventario>
            <revertida>true</revertida>
        </Visita>
        <Visita>
            <idVisita>10</idVisita>
            <fechaHora>2024-07-10T11:45:00Z</fechaHora>
            <asesor>Patricia Navarro</asesor>
            <verificada>true</verificada>
            <ingresos>5</ingresos>
            <retiros>1</retiros>
            <correccionesDeInventario>3</correccionesDeInventario>
            <revertida>false</revertida>
        </Visita>
    </Visitas>
    <Movimientos>
      <Movim>
            <fechaHora>2024-07-01T10:00:00Z</fechaHora>
            <hechoEnVisita>true</hechoEnVisita>
            <idVisita>1</idVisita>
            <ProductosIngresados>
                <Producto>
                    <nombre>Producto A</nombre>
                    <cantidad>5</cantidad>
                </Producto>
                <Producto>
                    <nombre>Producto C</nombre>
                    <cantidad>3</cantidad>
                </Producto>
            </ProductosIngresados>
            <ProductosRetirados>
                <Producto>
                    <nombre>Producto B</nombre>
                    <cantidad>2</cantidad>
                </Producto>
                <Producto>
                    <nombre>Producto D</nombre>
                    <cantidad>6</cantidad>
                </Producto>
            </ProductosRetirados>
        </Movim>
        <Movim>
            <fechaHora>2024-07-02T11:30:00Z</fechaHora>
            <hechoEnVisita>false</hechoEnVisita>
            <idVisita>2</idVisita>
            <ProductosIngresados>
                <Producto>
                    <nombre>Camisa Azul</nombre>
                    <cantidad>5</cantidad>
                </Producto>
                <Producto>
                    <nombre>Pantalón Negro</nombre>
                    <cantidad>3</cantidad>
                </Producto>
            </ProductosIngresados>
            <ProductosRetirados>
                <Producto>
                    <nombre>Vestido Rojo</nombre>
                    <cantidad>2</cantidad>
                </Producto>
                <Producto>
                    <nombre>Chaqueta Verde</nombre>
                    <cantidad>6</cantidad>
                </Producto>
            </ProductosRetirados>
        </Movim>
        <Movim>
            <fechaHora>2024-07-03T14:00:00Z</fechaHora>
            <hechoEnVisita>true</hechoEnVisita>
            <idVisita>3</idVisita>
            <ProductosIngresados>
            <Producto>
                <nombre>Camisa Azul</nombre>
                <cantidad>5</cantidad>
            </Producto>
            <Producto>
                <nombre>Pantalón Negro</nombre>
                <cantidad>3</cantidad>
            </Producto>
        </ProductosIngresados>
        <ProductosRetirados>
            <Producto>
                <nombre>Vestido Rojo</nombre>
                <cantidad>2</cantidad>
            </Producto>
            <Producto>
                <nombre>Chaqueta Verde</nombre>
                <cantidad>6</cantidad>
            </Producto>
        </ProductosRetirados>
        </Movim>
        <Movim>
        <fechaHora>2024-07-04T16:15:00Z</fechaHora>
        <hechoEnVisita>false</hechoEnVisita>
        <idVisita>4</idVisita>
        <ProductosMovidos>
            <Producto>
            <nombre>Producto G</nombre>
            <cantidad>1</cantidad>
            </Producto>
        </ProductosMovidos>
        <ProductosMovidos>
            <Producto>
            <nombre>Producto H</nombre>
            <cantidad>5</cantidad>
            </Producto>
        </ProductosMovidos>
        </Movim>
        <Movim>
        <fechaHora>2024-07-05T09:45:00Z</fechaHora>
        <hechoEnVisita>true</hechoEnVisita>
        <idVisita>5</idVisita>
        <ProductosMovidos>
            <Producto>
            <nombre>Producto I</nombre>
            <cantidad>3</cantidad>
            </Producto>
        </ProductosMovidos>
        <ProductosMovidos>
            <Producto>
            <nombre>Producto J</nombre>
            <cantidad>2</cantidad>
            </Producto>
        </ProductosMovidos>
        </Movim>
        <Movim>
        <fechaHora>2024-07-06T12:00:00Z</fechaHora>
        <hechoEnVisita>false</hechoEnVisita>
        <idVisita>6</idVisita>
        <ProductosIngresados>
            <Producto>
                <nombre>Camisa Azul</nombre>
                <cantidad>5</cantidad>
            </Producto>
            <Producto>
                <nombre>Pantalón Negro</nombre>
                <cantidad>3</cantidad>
            </Producto>
        </ProductosIngresados>
        <ProductosRetirados>
            <Producto>
                <nombre>Vestido Rojo</nombre>
                <cantidad>2</cantidad>
            </Producto>
            <Producto>
                <nombre>Chaqueta Verde</nombre>
                <cantidad>6</cantidad>
            </Producto>
        </ProductosRetirados>
        </Movim>
        <Movim>
        <fechaHora>2024-07-07T13:30:00Z</fechaHora>
        <hechoEnVisita>true</hechoEnVisita>
        <idVisita>7</idVisita>
        <ProductosIngresados>
            <Producto>
                <nombre>Camisa Azul</nombre>
                <cantidad>5</cantidad>
            </Producto>
            <Producto>
                <nombre>Pantalón Negro</nombre>
                <cantidad>3</cantidad>
            </Producto>
        </ProductosIngresados>
        <ProductosRetirados>
            <Producto>
                <nombre>Vestido Rojo</nombre>
                <cantidad>2</cantidad>
            </Producto>
            <Producto>
                <nombre>Chaqueta Verde</nombre>
                <cantidad>6</cantidad>
            </Producto>
        </ProductosRetirados>
        </Movim>
        <Movim>
        <fechaHora>2024-07-08T15:00:00Z</fechaHora>
        <hechoEnVisita>false</hechoEnVisita>
        <idVisita>8</idVisita>
        <ProductosMovidos>
            <Producto>
            <nombre>Producto O</nombre>
            <cantidad>1</cantidad>
            </Producto>
        </ProductosMovidos>
        <ProductosMovidos>
            <Producto>
            <nombre>Producto P</nombre>
            <cantidad>4</cantidad>
            </Producto>
        </ProductosMovidos>
        </Movim>
        <Movim>
        <fechaHora>2024-07-09T10:15:00Z</fechaHora>
        <hechoEnVisita>true</hechoEnVisita>
        <idVisita>9</idVisita>
        <ProductosMovidos>
            <Producto>
            <nombre>Producto Q</nombre>
            <cantidad>3</cantidad>
            </Producto>
        </ProductosMovidos>
        <ProductosMovidos>
            <Producto>
            <nombre>Producto R</nombre>
            <cantidad>2</cantidad>
            </Producto>
        </ProductosMovidos>
        </Movim>
        <Movim>
        <fechaHora>2024-07-10T11:45:00Z</fechaHora>
        <hechoEnVisita>false</hechoEnVisita>
        <idVisita>10</idVisita>
        <ProductosIngresados>
            <Producto>
                <nombre>Camisa Azul</nombre>
                <cantidad>5</cantidad>
            </Producto>
            <Producto>
                <nombre>Pantalón Negro</nombre>
                <cantidad>3</cantidad>
            </Producto>
        </ProductosIngresados>
        <ProductosRetirados>
            <Producto>
                <nombre>Vestido Rojo</nombre>
                <cantidad>2</cantidad>
            </Producto>
            <Producto>
                <nombre>Chaqueta Verde</nombre>
                <cantidad>6</cantidad>
            </Producto>
        </ProductosRetirados>
        </Movim>

    </Movimientos>
    <Correcciones>
      <CorreccionDeExistencias>
            <fechaHora>01/04/2024 a las 22:18:53</fechaHora>
            <visita>No</visita>
            <ProductosCorregidos>
               <ProductoCorr>
                    <codigo>4</codigo>
                    <nombre>Chaqueta Negra</nombre>
                    <cantidadCorregida>4</cantidadCorregida>
                    <adicion>false</adicion>
                    <motivoDeCorreccion>Ajuste de inventario</motivoDeCorreccion>
                    <nota>Ajuste por error en conteo previo</nota>
                </ProductoCorr>
                <ProductoCorr>
                    <codigo>1</codigo>
                    <nombre>Camisa Blanca</nombre>
                    <cantidadCorregida>10</cantidadCorregida>
                    <adicion>true</adicion>
                    <motivoDeCorreccion>Corrección de inventario</motivoDeCorreccion>
                    <nota>Ajuste de stock por inventario anual</nota>
                </ProductoCorr>
            </ProductosCorregidos>
            <idVisita>0</idVisita>
      </CorreccionDeExistencias>
      <CorreccionDeExistencias>
            <fechaHora>03/05/2024 a las 21:18:53</fechaHora>
            <visita>Si</visita>
            <ProductosCorregidos>
                <ProductoCorr>
                    <codigo>2</codigo>
                    <nombre>Pantalón Azul</nombre>
                    <cantidadCorregida>5</cantidadCorregida>
                    <adicion>false</adicion>
                    <motivoDeCorreccion>Devolución de cliente</motivoDeCorreccion>
                    <nota>Devolución por defecto de fabricación</nota>
                </ProductoCorr>
                <ProductoCorr>
                    <codigo>3</codigo>
                    <nombre>Vestido Rojo</nombre>
                    <cantidadCorregida>8</cantidadCorregida>
                    <adicion>true</adicion>
                    <motivoDeCorreccion>Nuevo stock</motivoDeCorreccion>
                    <nota>Ingreso de nueva colección primavera</nota>
                </ProductoCorr>
            </ProductosCorregidos>
            <idVisita>0</idVisita>
      </CorreccionDeExistencias>
    </Correcciones>
  </acontecimientosDeVisita>
`;
