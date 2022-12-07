export abstract class MapperFromDB<TypeDB, TypeDto> {

  public abstract fromDB(data: TypeDB): TypeDto;
}

export abstract class MapperToDB<TypeDB, TypeDto> {

  public abstract toDB(data: TypeDto): TypeDB;
}

export abstract class Mapper<TypeDB, TypeDto> implements MapperFromDB<TypeDB, TypeDto>, MapperToDB<TypeDB, TypeDto> {

  public abstract fromDB(data: TypeDB): TypeDto;

  public abstract toDB(data: TypeDto): TypeDB;
}
