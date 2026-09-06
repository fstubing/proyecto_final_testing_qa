# language: es
Característica: Reserva de una habitación de hotel
  Como huésped
  Quiero reservar una habitación
  Para asegurar mi alojamiento

  Escenario: Reservar una habitación disponible
    Dado que existe una habitación disponible
    Cuando el huésped completa los datos de reserva
    Y confirma la reserva
    Entonces la reserva queda registrada
    Y se muestra el código de confirmación
